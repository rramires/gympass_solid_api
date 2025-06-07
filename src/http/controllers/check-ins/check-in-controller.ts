import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function checkInController(request: FastifyRequest, reply: FastifyReply) {
	const { sub: userId } = request.user

	const paramsSchema = z.object({
		gymId: z.string().uuid(),
	})
	const { gymId } = paramsSchema.parse(request.params)

	const bodySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})
	const { latitude, longitude } = bodySchema.parse(request.query)

	const checkInUseCase = makeCheckInUseCase()
	await checkInUseCase.execute({
		userId,
		gymId,
		userLatitude: latitude,
		userLongitude: longitude,
	})

	return reply.status(201).send()
}
