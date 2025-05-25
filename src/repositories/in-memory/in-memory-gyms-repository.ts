import { Gym } from '@/prisma-client'
import { IGymsRepository } from '../i-gyms-repository'

export class InMemoryGymsRepository implements IGymsRepository {
	// in-memory mock database
	public items: Gym[] = []

	async findById(id: string): Promise<Gym | null> {
		// find by id
		const gym = this.items.find((item) => item.id === id)

		return gym || null
	}
}
