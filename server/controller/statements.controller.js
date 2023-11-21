import path from 'path'
import StatementsModel from '../models/statements.model.js'

const __dirname = path.resolve()

const getHomepage = (req, res) => {
	res.sendFile(path.join(__dirname + '../../client/index.html'))
}

const getStatements = async (request, response) => {
	const allTwits = await StatementsModel.find()

	if (allTwits) {
		response.send(allTwits)
	} else {
		response.status(404)
		response.send({ message: 'statements is not created' })
	}
}

const addStatements = async (request, response) => {
	const newTwit = await StatementsModel.create({ ...request.body })

	return response.send({ newTwit, message: 'statements added' })
}

const deleteStatements = (request, response) => {
	const id = request.params.id

	const deletedTwit = StatementsModel.findByIdAndDelete(id)

	response.send({ message: 'statements deleted', deletedTwit })
}

const StatementsController = {
	getHomepage,
	getStatements,
	addStatements,
	deleteStatements,
}

export default StatementsController
