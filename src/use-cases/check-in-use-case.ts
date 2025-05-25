import { CheckIn } from '@/prisma-client'
import { ICheckInsRepository } from '@/repositories/i-check-ins-repository'
import { IGymsRepository } from '@/repositories/i-gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface CheckInUseCaseRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn
}

const MAX_DISTANCE_IN_KILOMETERS: number = 0.1 // 0.1=100m

export class CheckInUseCase {
	constructor(
		private checkInsRepository: ICheckInsRepository,
		private gymsRepository: IGymsRepository,
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId)
		if (!gym) {
			throw new ResourceNotFoundError()
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
		)

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new Error('Invalid distance.')
		}

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
