import { FastifyInstance } from 'fastify'
import { hello } from './controllers/hello'
import { registerController } from './controllers/register-controller'

export async function appRoutes(app: FastifyInstance) {
	// Hello World
	app.get('/hello', hello)
	//
	app.post('/users', registerController)
}
