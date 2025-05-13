import { FastifyInstance } from 'fastify'
import { hello } from './controllers/hello'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
	// Hello World
	app.get('/hello', hello)
	//
	app.post('/users', register)
}
