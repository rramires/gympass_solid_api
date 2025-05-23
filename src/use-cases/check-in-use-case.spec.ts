import { beforeEach, afterEach, expect, describe, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in-use-case'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(() => {
		// in-memory mock database
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new CheckInUseCase(checkInsRepository)
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
		})
		// return id string
		expect(checkIn.id).toEqual(expect.any(String))
	})
})
