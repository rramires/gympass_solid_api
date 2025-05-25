import { beforeEach, afterEach, expect, describe, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in-use-case'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(() => {
		// in-memory mock database
		checkInsRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()
		sut = new CheckInUseCase(checkInsRepository, gymsRepository)
		// mock gym
		gymsRepository.items.push({
			id: 'gym-01',
			title: 'TypeScript Gym',
			description: 'Best Gyn in the city',
			phone: '9999-8888',
			latitude: new Decimal(0),
			longitude: new Decimal(0),
		})
		// Enable fix datetime
		vi.useFakeTimers()
	})

	afterEach(() => {
		// Run real datetime again
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		// add
		const { checkIn } = await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: 0,
			userLongitude: 0,
		})
		// return id string
		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice in the same day', async () => {
		// Fix date
		vi.setSystemTime(new Date('2025-05-22T08:00:00Z'))
		// Add 1º check in
		await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: 0,
			userLongitude: 0,
		})
		// Try 2º check in
		await expect(
			sut.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: 0,
				userLongitude: 0,
			}),
		).rejects.toBeInstanceOf(Error)
	})

	it('should be able to check in twice but in different days', async () => {
		// Fix date
		vi.setSystemTime(new Date('2025-05-22T08:00:00Z'))
		// Add 1º check in
		await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: 0,
			userLongitude: 0,
		})
		// Fix different date
		vi.setSystemTime(new Date('2025-05-23T08:00:00Z'))
		// Add 2º check in - OK
		const { checkIn } = await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: 0,
			userLongitude: 0,
		})
		// return id string
		expect(checkIn.id).toEqual(expect.any(String))
	})
})
