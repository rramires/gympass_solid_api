import { IGymsRepository } from '@/repositories/i-gyms-repository'
import { Gym } from '@/prisma-client'

interface CreateGymUseCaseRequest {
	title: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

interface CreateGymUseCaseResponse {
	gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	}: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
		// call persistence
		const gym = await this.gymsRepository.create({
			title,
			description,
			phone,
			latitude,
			longitude,
		})
		return {
			gym,
		}
	}
}
