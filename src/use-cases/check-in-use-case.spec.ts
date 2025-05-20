import { expect, describe, it } from 'vitest'
import { CheckInUseCase } from './check-in-use-case'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repositories'
import { beforeEach } from 'vitest'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(() => {
		// in-memory mock database
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new CheckInUseCase(checkInsRepository)
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
