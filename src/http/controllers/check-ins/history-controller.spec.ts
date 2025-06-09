import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import createAndAuthUser from '@/utils/tests/create-and-auth-user'
import getTestCoordinates from '@/utils/tests/get-test-coordinates'

describe('Check-in History (e2e)', () => {
	beforeAll(async () => {
		// running app
		await app.ready()
	})

	afterAll(async () => {
		// shutdown app
		await app.close()
	})

	it('should be able to list the history of check-ins', async () => {
		// get auth user
		const { token } = await createAndAuthUser(app)

		// get test positions
		const { coordinates } = getTestCoordinates()

		// create gym
		const responseGym = await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'TypeScrypt Gym',
				description: 'Best TS Gyn in the city',
				phone: '9999-8888',
				latitude: coordinates.lat,
				longitude: coordinates.lon,
			})
		const { id: gymId } = responseGym.body.gym

		const response = await request(app.server)
			.post(`/gyms/${gymId}/check-ins`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: coordinates.lat,
				longitude: coordinates.lon,
			})

		expect(response.statusCode).toEqual(201)
	})
})
