import mongoose, {Schema} from mongoose;

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
    }
)

export const User = mongoose.model("User",userSchema)