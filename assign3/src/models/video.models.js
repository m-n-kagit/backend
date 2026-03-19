import mongoose, {Schema} from "mongoose"

const videoschema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String, //cloudinery url 

        },
        duration : {
            type : Number,
            required: true
        },
        views: {
            type : Number,
            default: 0
        },
        isPublished : {
            type :Boolean,
            default:0
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
)