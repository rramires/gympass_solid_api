import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
// import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '@/use-cases/register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const bodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})
	const { name, email, password } = bodySchema.parse(request.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		// or
		// const usersRepository = new InMemoryUsersRepository()
		const registerUseCase = new RegisterUseCase(usersRepository)
		await registerUseCase.execute({ name, email, password })
	} catch {
		// 409 Conflict
		return reply.status(409).send()
	}

	return reply.status(201).send()
}
