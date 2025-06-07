import { FastifyInstance } from 'fastify'
import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt-middleware'
import { checkInController } from './check-inController'

export async function checkInsRoutes(app: FastifyInstance) {
	/**
	 * Authenticated routes
	 */
	app.addHook('onRequest', verifyJwtMiddleware)
	//
	/* app.get('/gyms/search', searchController)
	app.get('/gyms/nearby', nearbyController)*/
	//
	app.post('/gyms/:gymId/check-ins', checkInController)
}
