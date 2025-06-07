import { FastifyInstance } from 'fastify'
import { hello } from './hello'
import { registerController } from './register-controller'
import { authenticateController } from './authenticate-controller'
import { profileController } from './profile-controller'
import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt-middleware'

export async function usersRoutes(app: FastifyInstance) {
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
