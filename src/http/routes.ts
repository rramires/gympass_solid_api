import { FastifyInstance } from 'fastify'
import { hello } from './controllers/hello'
import { registerController } from './controllers/register-controller'
import { authenticateController } from './controllers/authenticate-controller'
import { profileController } from './controllers/profile-controller'

export async function appRoutes(app: FastifyInstance) {
	/**
	 * Unauthenticated routes
	 */
	app.get('/hello', hello)
	app.post('/users', registerController)
	app.post('/sessions', authenticateController)
	/**
	 * Authenticated routes
	 */
	app.get('/me', profileController)
}
