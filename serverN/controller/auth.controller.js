import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const { verify } = pkg

import UsersModel from '../models/user.model.js'

const login = async (req, res) => {
	if (!req.body || !req.body.email || !req.body.password) {
		res.status(403)
		res.send({ message: 'invalid data' })
		return
	}

	const userFromDB = await UsersModel.findOne({
		email: req.body.email,
	})

	if (!userFromDB || !userFromDB.password || !userFromDB.email) {
		res.status(404)
		res.send({ message: 'no such user' })
		return
	}

	const isValidPassword = await bcrypt.compare(req.body.password, userFromDB.password)

	if (!isValidPassword) {
		res.status(203)
		res.send({ message: 'invalid password' })
		return
	}

	const userDTO = {
		_id: userFromDB._id,
		email: userFromDB.email,
		fullName: userFromDB.fullName,
	}

	res.send({
		data: userDTO,
	})
}

const verifyToken = async (req, res) => {
	if (!req.query.token) {
		res.status(403)
		res.send({ message: 'no token' })
	}

	const token = req.query.token

	try {
		const verified = verify(token, process.env.SECRET_KEY || '')

		const userFromDB = await UsersModel.findOne({
			_id: verified?._id,
			email: verified?.email,
		})

		if (!userFromDB) {
			res.status(404)
			res.send({ message: 'no such user' })
			return
		}

		res.send({
			message: 'token verified',
			data: {
				_id: userFromDB._id,
				email: userFromDB.email,
				fullName: userFromDB.fullName,
			},
		})
	} catch (error) {
		res.status(403)
		res.send({ message: 'invalid token', error })
	}
}
const userRegister = async (req, res) => {
	//Checking if the user in database
	const emailExist = await UsersModel.findOne({ email: req.body.email })

	if (emailExist) return res.status(400).send({ statusText: 'Такий email вже існує' })

	const usernameExist = await UsersModel.findOne({ username: req.body.fullName })
	if (usernameExist) return res.status(400).send({ statusText: 'Такий нікнейм вже існує' })

	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)
	//Create new user
	const user = new UsersModel({
		email: req.body.email,
		fullName: req.body.fullName,
		password: hashPassword,
	})
	try {
		await user.save()
		// await sendEmail(msgOptions)
		res.send({ statusText: 'Thanks for registering.', email: user.email, fullName: user.fullName })
	} catch (err) {
		res.status(400).send({ statusText: 'Something went wrong. Please contact us' })
		return err
	}
}

const AuthController = {
	login,
	verifyToken,
	userRegister,
}

export default AuthController
