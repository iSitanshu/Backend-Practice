import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req,res) => {
    // console.log("registering user: ",req);
    res.status(200).json({
        message: "chai aur code"
    })
} )

export { registerUser }