import express  from "express";
import StatementsController from '../controller/statements.controller.js'

const StatementsRouter = express.Router()

StatementsRouter.get('/homepage', StatementsController.getHomepage)
StatementsRouter.get('/', StatementsController.getStatements)
StatementsRouter.post('/', StatementsController.addStatements)
StatementsRouter.delete('/:category', StatementsController.deleteStatements)
// StatementsRouter.delete('/twits/:id', StatementsController.removeTwits)


export default StatementsRouter



