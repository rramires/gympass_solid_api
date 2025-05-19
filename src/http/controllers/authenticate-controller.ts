import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
	const bodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})
	const { email, password } = bodySchema.parse(request.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		const authenticateUseCase = new AuthenticateUseCase(usersRepository)
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
