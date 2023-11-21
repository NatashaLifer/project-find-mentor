import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const UsersSchema = new Schema({
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


export const UsersModel = mongoose.model('User', UsersSchema)
