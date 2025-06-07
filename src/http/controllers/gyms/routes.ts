import { FastifyInstance } from 'fastify'
import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt-middleware'
import { createController } from './create-controller'

export async function gymsRoutes(app: FastifyInstance) {
	/**
	 * Authenticated routes
	 */
	app.addHook('onRequest', verifyJwtMiddleware)
	//
	app.post('/gyms', createController)
}
