import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const docsSchema = new Schema(
    {
        docsFile: {
            type: String, 
            required: true
        },
        // thumbnail: {
        //     type: String, 
        //     required: true
        // },
        type: {
            type: String, 
            required: true
        },
        adminAcess:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
)

docsSchema.plugin(mongooseAggregatePaginate)

export const Docs = mongoose.model("Docs", docsSchema)