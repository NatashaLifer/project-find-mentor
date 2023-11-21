import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StatementsSchema = new Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Twits', StatementsSchema)