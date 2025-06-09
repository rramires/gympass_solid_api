import { FastifyInstance } from 'fastify'
import request from 'supertest'

export default async function createAndAuthUser(app: FastifyInstance) {
	const authUser = {
		name: 'John Doe',
		email: 'johndoe@example.com',
		password: 'abc123',
	}
	// create user
	await request(app.server).post('/users').send(authUser)

	// authenticate
	const authResponse = await request(app.server).post('/sessions').send({
		email: authUser.email,
		password: authUser.password,
	})
	const { token } = authResponse.body

	return {
		token,
		authUser,
	}
}
