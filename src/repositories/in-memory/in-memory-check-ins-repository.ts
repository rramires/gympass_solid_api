import { CheckIn, Prisma } from '@/prisma-client'
import { ICheckInsRepository } from '../i-check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
	// in-memory mock database
	public items: CheckIn[] = []

	async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		// new checkIn
		const checkIn = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
			created_at: new Date(),
		}
		this.items.push(checkIn)

		return checkIn
	}

	async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
		const startOfTheDay = dayjs(date).startOf('date') // 2025-05-22T00:00:00Z
		const endtOfTheDay = dayjs(date).endOf('date') //    2025-05-22T23:59:59Z

		const checkInOnSameDate = this.items.find((checkIn) => {
			const checkInDate = dayjs(checkIn.created_at)
			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endtOfTheDay)

			return checkIn.user_id === userId && isOnSameDate
		})
		return checkInOnSameDate || null
	}
}
