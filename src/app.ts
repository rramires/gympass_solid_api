import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.get('/hello', () => {
	return 'Hello from Fastfy!'
})

// Simple route
app.post('/users', async (request, reply) => {
	const bodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})
	const { name, email, password } = bodySchema.parse(request.body)

	await prisma.user.create({
		data: {
			name,
			email,
			password_hash: password,
		},
	})

	return reply.status(201).send()
})
