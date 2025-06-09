import { FastifyInstance } from 'fastify'
import request from 'supertest'

export default async function createAndAuthUser(app: FastifyInstance) {
	const newUser = {
		name: 'John Doe',
		email: 'johndoe@example.com',
		password: 'abc123',
	}
	// create user
	const response = await request(app.server).post('/users').send(newUser)
	const { user } = response.body

	// authenticate
	const authResponse = await request(app.server).post('/sessions').send({
		email: newUser.email,
		password: newUser.password,
	})
	const { token } = authResponse.body

	return {
		token,
		user,
	}
}
