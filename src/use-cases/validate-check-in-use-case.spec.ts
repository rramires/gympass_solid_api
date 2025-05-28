import { beforeEach, afterEach, expect, describe, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in-use-case'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
	beforeEach(async () => {
		// in-memory mock database
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new ValidateCheckInUseCase(checkInsRepository)

		// Enable fix datetime
		// vi.useFakeTimers()
	})

	afterEach(() => {
		// Run real datetime again
		// vi.useRealTimers()
	})

	it('should be able to validate check-in', async () => {
		// mock
		const createdCheckIn = await checkInsRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})
		// validate
		const { checkIn } = await sut.execute({
			checkInId: createdCheckIn.id,
		})
		// check
		expect(checkIn.validated_at).toEqual(expect.any(Date))
		expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
	})

	it('should not be able to validate an inexistent check-in', async () => {
		await expect(() =>
			sut.execute({
				checkInId: 'inexistent-check-in-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
