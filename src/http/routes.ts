import { FastifyInstance } from 'fastify'
import { hello } from './controllers/hello'
import { registerController } from './controllers/register-controller'
import { authenticateController } from './controllers/authenticate-controller'
import { profileController } from './controllers/profile-controller'
import { verifyJwtMiddleware } from './middlewares/verify-jwt-middleware'

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
	app.get('/me', { onRequest: [verifyJwtMiddleware] }, profileController)
}
