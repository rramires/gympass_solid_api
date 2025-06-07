import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearbyController(request: FastifyRequest, reply: FastifyReply) {
	const bodySchema = z.object({
		latitude: z.number(),
		longitude: z.number(),
	})
	const { latitude, longitude } = bodySchema.parse(request.body)

	const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

	const gyms = await fetchNearbyGymsUseCase.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	})

	return reply.status(200).send({
		gyms,
	})
}
