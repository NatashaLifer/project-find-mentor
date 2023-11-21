import bcrypt from 'bcrypt'
import { verify } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import UsersModel from '../models/statements.model.js'
import { getToken } from '@/utils'

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
		token: getToken(userDTO),
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
	if (error) return res.status(400).send({ statusText: error.details[0].message })

	//Checking if the user in database
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist) return res.status(400).send({ statusText: 'Такой email уже существует' })

	const usernameExist = await User.findOne({ username: req.body.fullName })
	if (usernameExist) return res.status(400).send({ statusText: 'Такой ник уже существует' })

	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)


	//Create new user
	const user = new User({
		_id: 123,
		email: req.body.email,
		fullName: req.body.fullName,
		password: hashPassword,
	})

	try {
		await user.save()
		console.log('asdasdasd')
		await sendEmail(msgOptions)
		res.send({ statusText: 'Thanks for registering. Please check your email !!' })
	} catch (err) {
		res.status(400).send({ statusText: 'Something went wrong. Please contact us speachthedictionary@gmail.com' })
		return err
	}
}

const AuthController = {
	login,
	verifyToken,
	userRegister,
}

export default AuthController
