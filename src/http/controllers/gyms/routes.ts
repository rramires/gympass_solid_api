import { FastifyInstance } from 'fastify'
import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt-middleware'

export async function gymsRoutes(app: FastifyInstance) {
	/**
	 * Authenticated routes
	 */
	app.addHook('onRequest', verifyJwtMiddleware)
	//
	//app.get('/sample', sampleController)
}
