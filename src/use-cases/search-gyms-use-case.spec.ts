import { beforeEach, expect, describe, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms-use-case'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

const coordinates = {
	lat: -25.4677004,
	lon: -49.304584,
}

describe('Search Gyms Use Case', () => {
	beforeEach(async () => {
		// in-memory mock database
		gymsRepository = new InMemoryGymsRepository()
		sut = new SearchGymsUseCase(gymsRepository)
	})

	it('should be able to search for gyms', async () => {
		// mock two gyms
		await gymsRepository.create({
			title: 'TypeScrypt Gym',
			description: 'Best TS Gyn in the city',
			phone: '9999-8888',
			latitude: coordinates.lat,
			longitude: coordinates.lon,
		})

		await gymsRepository.create({
			title: 'JavaScript Gym',
			description: 'Best TS Gyn in the city',
			phone: '8888-7777',
			latitude: coordinates.lat,
			longitude: coordinates.lon,
		})

		// fetch
		const { gyms } = await sut.execute({
			query: 'JavaScript',
			page: 1,
		})

		// check
		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
	})

	it('should be able to paginated search for gyms', async () => {
		// mock 22 gyms
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `TypeScript Gym ${i}`,
				description: 'Best TS Gyn in the city',
				phone: '8888-7777',
				latitude: coordinates.lat,
				longitude: coordinates.lon,
			})
		}

		// fetch
		const { gyms } = await sut.execute({
			query: 'TypeScript',
			page: 2,
		})

		// check
		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'TypeScript Gym 21' }),
			expect.objectContaining({ title: 'TypeScript Gym 22' }),
		])
	})
})
