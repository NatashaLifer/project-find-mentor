import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import config from './config.js'
import StatementsRouter from './routes/statements.route.js'
import { authRoutes } from './routes/statements.route.js'

const app = express()

app.use(json())
app.use(urlencoded({ extended: false }))


/* PORT */
// 8000 is the default port, so if you don't specify a port
// 8080 will be used instead.
// 5000 is the port used by the ExpressJS web server.
/* PORT */
app.use('/api/auth', authRoutes)
app.use('/api/statements', StatementsRouter)


mongoose
	.connect(config.MONGO_URL || '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDb connected'))
	.catch(err => console.error(err))


app.listen(config.PORT, () => {
	console.log(`Port is start = ${config.PORT}`)
})


