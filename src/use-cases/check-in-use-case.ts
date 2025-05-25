import { CheckIn } from '@/prisma-client'
import { ICheckInsRepository } from '@/repositories/i-check-ins-repository'
import { IGymsRepository } from '@/repositories/i-gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(
		private checkInsRepository: ICheckInsRepository,
		private gymsRepository: IGymsRepository,
	) {}

	async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId)
		if (!gym) {
			throw new ResourceNotFoundError()
		}

		// TODO: Calculate the distance between user and gym

		// TODO: If distance  > 100m -> throw invalid distance error

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)
		if (checkInOnSameDay) {
			throw new Error('checkInOnSameDay')
		}

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
		})

		return {
			checkIn,
		}
	}
}
