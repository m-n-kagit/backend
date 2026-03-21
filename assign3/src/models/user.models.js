import mongoose, {Schema} from mongoose;
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase: true,
            trim : true
        },
        fullname : {
            type: String, 
            required : type,
            trim : true,
            index : true
        },
        avatar: {
            type : String, //Cloudinary url 
            required: true
        },
        coverImage : {
            type : String , //Cloudinary url 
        },
        watchHistory: [
            {
                type : Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type : String,
            required: [true , 'Password is required']
        },
        refreshToken : {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save",async function(next){ //pre save hook for hashing password before saving to database
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10) //hashing password with salt rounds of 10
    next() //call next middleware or save the document if no more middleware is present
})
userSchema.methods.isPasswordCorrect = async function(password){
    jwt.sign( //giving payload to the token and signing it with secret key and setting expiry time
        {
            _id: this._id,
            email: this.email,
            username:this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} //method to compare password during login

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username:this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} //method to generate refresh token
export const User = mongoose.model("User",userSchema)