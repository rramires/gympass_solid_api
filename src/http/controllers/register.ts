import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { regirsterUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const bodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})
	const { name, email, password } = bodySchema.parse(request.body)

	try {
		await regirsterUseCase({ name, email, password })
	} catch {
		// 409 Conflict
		return reply.status(409).send()
	}

	return reply.status(201).send()
}
