import { Prisma, CheckIn } from '@/prisma-client'

export interface ICheckInsRepository {
	create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
	findById(id: string): Promise<CheckIn | null>
	save(checkIn: CheckIn): Promise<CheckIn>
	findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
	findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
	countByUserId(userId: string): Promise<number>
}
