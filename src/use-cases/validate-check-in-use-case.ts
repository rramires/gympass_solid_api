import { CheckIn } from '@/prisma-client'
import { ICheckInsRepository } from '@/repositories/i-check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInUseCaseRequest {
	checkInId: string
}

interface ValidateCheckInUseCaseResponse {
	checkIn: CheckIn
}

export class ValidateCheckInUseCase {
	constructor(private checkInsRepository: ICheckInsRepository) {}

	async execute({
		checkInId,
	}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
		// find
		const checkIn = await this.checkInsRepository.findById(checkInId)
		if (!checkIn) {
			throw new ResourceNotFoundError()
		}

		checkIn.validated_at = new Date()

		await this.checkInsRepository.save(checkIn)

		return {
			checkIn,
		}
	}
}
