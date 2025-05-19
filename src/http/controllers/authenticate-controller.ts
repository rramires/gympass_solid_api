import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
	const bodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})
	const { email, password } = bodySchema.parse(request.body)

	try {
		const authenticateUseCase = makeAuthenticateUseCase()
		await authenticateUseCase.execute({
			email,
			password,
		})
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			// 401 Unauthorized
			return reply.status(401).send({ message: err.message })
		}
		// Other unspecified errors (Fastify capture this)
		throw err
	}

	return reply.status(200).send()
}
