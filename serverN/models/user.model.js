import mongoose from 'mongoose'

const Schema = mongoose.Schema

 const UsersSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

})



export default mongoose.model('User', UsersSchema)
