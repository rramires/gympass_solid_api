import { CheckIn, Prisma } from '@/prisma-client'
import { ICheckInsRepository } from '../i-check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
	// in-memory mock database
	public items: CheckIn[] = []

	async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		// new checkIn
		const chekIn = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
			created_at: new Date(),
		}
		this.items.push(chekIn)

		return chekIn
	}
}
