import mongoose, {Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
//allowes to write aggregation queries - first step 


const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        thumbNail: {
            type: String,
            required: true
        },
        decription: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 
    },{timestamp: true}
)

//use mongooseAggregationpagination before exxport step two
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)