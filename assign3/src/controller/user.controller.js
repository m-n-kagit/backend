import asyncHandler from "../utils/asynhandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import uploadCloudinery from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;

    // 1. Improved Validation
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // 2. Check if user exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // 3. Handle File Paths Safely
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // 4. Upload to Cloudinary
    const avatar = await uploadCloudinery(avatarLocalPath);
    
    // Upload cover image only if it exists
    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadCloudinery(coverImageLocalPath);
    }

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // 5. Create User
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", // Use the result of the upload
        email,
        password,
        username: username.toLowerCase()
    });

    const created_user = await User.findById(user._id).select("-password -refreshToken");

    if (!created_user) {
        throw new ApiError(500, "Failed to register user");
    }

    return res.status(201).json(
        new ApiResponse(201, created_user, "User registered successfully")
    );
});

export default registerUser;