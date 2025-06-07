import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

const user = {
	name: 'John Doe',
	email: 'johndoe@example.com',
	password: '123456',
}

describe('Profile (e2e)', () => {
	beforeAll(async () => {
		// running app
		await app.ready()
	})

	afterAll(async () => {
		// shutdown app
		await app.close()
	})

	it('should be able to get user profile', async () => {
		// create user
		await request(app.server).post('/users').send(user)

		// authenticate
		const authResponse = await request(app.server).post('/sessions').send({
			email: user.email,
			password: user.password,
		})
		const { token } = authResponse.body

		// get profile
		const profileResponse = await request(app.server)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(profileResponse.statusCode).toEqual(200)
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				name: user.name,
			}),
		)
	})
})
