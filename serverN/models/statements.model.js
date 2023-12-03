import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StatementsSchema = new Schema({
    id: {
        type: Number,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, 
    rating: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgUrl: {
        type: String,
    }
})

export default mongoose.model('Twits', StatementsSchema)