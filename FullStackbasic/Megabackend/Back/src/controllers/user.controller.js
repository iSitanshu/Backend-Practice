import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import pkg from 'mongoose'
// import { Aggregate } from "mongoose"
const { Aggregate } = pkg;

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        // console.log("accessToken = ",accessToken," and ","another Token = ",refreshToken)

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false}) //validation no need to validate password to save refreshToken and accessToken

        // console.log("AccessToken = ",accessToken," and ","RefreshToken ",refreshToken);
        
        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access Token")
    }
}

const registerUser = asyncHandler( async (req,res) => {
    // console.log("registering user: ",req);
    // res.status(200).json({
    //     message: "chai aur code"
    // })
    // console.log("Request Body = ",req.body);
    
    // get user detail from frontend
    const { fullName, email, username, password } = req.body
    // console.log("Full name : ",fullName);
    // console.log("Email : ",email);
    // console.log("Password : ",password);
    // console.log("Username : ",username);
    

    // if(fullname === ""){throw new ApiError(400, "Full name is required")}
    
    //validate
    if(
        [fullName, email, username, password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    //check if already exits
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }
    // console.log("Request files are : ",req.files);
    
    //check for image
    if (!req.files || !req.files.avatar || req.files.avatar.length === 0) {
        throw new ApiError(400, "Avatar file is required");
    }
    const avatarLocalPath = req.files.avatar[0].path;
    
    if (!req.files.coverImage || req.files.coverImage.length === 0) {
        console.log("No cover image provided.");
    }
    const coverImageLocalPath = req.files.coverImage ? req.files.coverImage[0].path : null;
    



    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.avatar[0]?.path;
    // if(!avatarLocalPath){
    //     throw new ApiError(400,"Avatar file is required")
    // }

    //upload to cloudiary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    //create user model
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url||"",
        email,
        password,
        username: username.toLowerCase()
    })
    // console.log("The user model is = ",user)

    //remove password and refreshToken from the model
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //check for userCreation
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    //response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully !!!")
    )
} )

const loginUser = asyncHandler(async(req,res) => {
    //getting the user details from frontend
    const {username, email, password} = req.body

    //currently we want both username and email 
    //validate
    if(!username && !email){
        throw new ApiError(400,"Username or password is required")
    }

    // for either email or name
    // if(!(username || email)){
    //     throw new ApiError(400,"Username or password is required")
    // }

    // Query
    //checking in the data base server
    const user = await User.findOne({
        $or: [{username},{email}]
    }) //or operator find krega value ya too email k basis pr ya too username k basic pr

    if(!user){
        throw new ApiError(400,"User does not exit")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credential")
    }
    //
    
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    // console.log("accessToken = ",accessToken," and ","refreshToken = ",refreshToken);
    
    //remmove the unwanted field for security reasons
    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    // const options = {
    //     httpOnly: true,
    //     secure: true, //sirf aur sirf server se modifiable hoengi
    // }

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'None',
    };

    return res
    .status(200)
    .cookie("accessToken",accessToken, options) //iss se cookie mein store hoga
    .cookie("refreshToken",refreshToken, options) //iss se cookie mein store hoga
    .json( //iss se json response ban k jaega user ki taraf
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in Successfully"
        )
    )
}) 

const logoutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            //jo bhi field unset krni hai uss field pr unset paas krdo
            $unset: {
                refreshToken: 1
                // refreshToken: 1 //this removes the field document 
            }
        },
        {
            new: true
        }
    )

    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }  

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'None',
    };
    

    return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User Logged out"))
})

const refreshAccessToken = asyncHandler(async(req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
    if(incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        ) // get decoded token
    
        const user = await User.findById(decodedToken?._id)
    
        if(!incomingRefreshToken){
            throw new ApiError(401,"Invalid refresh Token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newrefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newrefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newrefreshToken},
                "Access Token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh Token")
    }
})

const changeCurrentPassword = asyncHandler(async(req,res) => {
    const {oldPassword, newPassword} = req.body;

    // to be noted if a person able to change the password that means the user is currently logged in
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect =  await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})
    
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password Changed successfully"))
})

const getCurrentUser = asyncHandler(async(req,res) => {
    return res
    .status(200)
    .json(new ApiResponse(200,req.user,"Current user fetched successfully"))
})

const updateAccountDetails = asyncHandler(async(req,res) => {
    const {fullName, email} = req.body

    if(!fullName || !email){
        throw new ApiError(400,"All fields are required")
    }
    
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullName,
                email
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))
})

const updateUserAvatar = asyncHandler(async(req,res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400,"Error while uploading on Avatar")
    }

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Avatar updated successfully"))
})

const updateUserCoverImage = asyncHandler(async(req,res) => {
    const coverImageLocalPath = req.file?.path

    if(!coverImageLocalPath){
        throw new ApiError(400,"Cover image file is missing")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!coverImage.url){
        throw new ApiError(400,"Error while uploading on cover image")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Cover Image updated successfully"))
})

const getUserChannelProfile = asyncHandler(async(req,res) => {
    const {username} = req.params
    if(!username?.trim()){
        throw new ApiError(400,"username is missing")
    }
    
    // User.find({username}) - username se document find krte hai User.find({username}) desend approach but 
    // username lenge aur uski ID k base pr Aggregation lagaenge - we can implement aggregation directly
    
    const channel = await User.aggregate([
        //we match the user
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        //count the subscribers channel k through
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        //hamne kitto ko subscribe kr rakha hai
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribedTo"
            }
        },
        //adding more fields to the user using PIPELINE AGGREGATION
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ])
    if(channel?.length){
        throw new ApiError(404,"Channel does not exists")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,channel[0],"User channel fetched successfully")
    )
})

// WE GET THE GETWATCHHISTORY
const getWatchHistory = asyncHandler(async(req,res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                },
                                {
                                    $addFields:{
                                        $owner:{
                                            first: "$owner"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch history fetched successfully"
        )
    )
})

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
} 

/* 
Basic steps to register user
1. get user detail from frontend (we can get request/data of user detail from posptman - we have created model for that)
2. Validation
3. check if user already exits - checking by unique uername and email
4. check for images, check for awatar
5. upload to cloudiinary - avatar 
6. create user object - create entry in DB
7. remove password and refresh token field from response 
8. check for user creation
9. return response 
10. else error
*/

/*
Basic steps to signin user
1. req body -> data
2. Validate the username and email
3. find the user 
4. password check
5. access and refresh token generate krne k baad user ko bhejna hoga
6. send cookie
*/