import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function searchController(request: FastifyRequest, reply: FastifyReply) {
	const bodySchema = z.object({
		query: z.string(),
		page: z.coerce.number().min(1).default(1),
	})
	const { query, page } = bodySchema.parse(request.query)

	const searchGymsUseCase = makeSearchGymsUseCase()
	const gyms = await searchGymsUseCase.execute({
		query,
		page,
	})

	return reply.status(200).send({
		gyms,
	})
}
