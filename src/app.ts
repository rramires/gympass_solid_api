import fastify from 'fastify'
import { PrismaClient } from './prisma-client'

export const app = fastify()

app.get('/hello', () => {
	return 'Hello from Fastfy!'
})

// test in your browser with http://localhost:3333/hello

// Test Prisma
const prisma = new PrismaClient()

prisma.user.create({
	data: {
		name: 'Fulano',
		email: 'email@test.com',
	},
})
