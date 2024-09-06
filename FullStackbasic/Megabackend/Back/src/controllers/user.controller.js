import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false}) //validation no need to validate password to save refreshToken and accessToken

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
    const {username, email, password} = req.body

    if(!username || !email){
        throw new ApiError(400,"Username or password is required")
    }

    // Query
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
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    

}) 

export { registerUser, loginUser } 

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