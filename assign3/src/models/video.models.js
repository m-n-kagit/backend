import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2" 
const videoschema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String, //cloudinery url 

        },
        title: {
            type : String, 
            required: true
        },
        description:{
            type : String , 
            required : true
        }
        ,
        duration : {
            type : Number, //cloudinery url 
            required: true
        },
        views: {
            type : Number,
            default: 0
        },
        isPublished : {
            type :Boolean,
            default:true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
)
//pagination means dividing the data into pages 
// and fetching only a limited number of records 
// per page to improve performance and user experience 
// when dealing with large datasets.
videoschema.plugin(mongooseAggregatePaginate) 
//plugin used here for pagination 
// of videos when we fetch them from database 
// using aggregate function in video 
// controller

export const Video = mongoose.model("Video", videoschema)