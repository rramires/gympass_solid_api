import { Gym, Prisma } from '@/prisma-client'
import { IGymsRepository } from '../i-gyms-repository'
import { GymCreateInput } from '@/prisma-client/models'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements IGymsRepository {
	// in-memory mock database
	public items: Gym[] = []

	async create(data: GymCreateInput) {
		// new gym
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
			created_at: new Date(),
		}
		this.items.push(gym)

		return gym
	}

	async findById(id: string) {
		// find by id
		const gym = this.items.find((item) => item.id === id)

		return gym || null
	}
}
