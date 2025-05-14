import { Prisma } from '@/prisma-client'

export class InMemoryUsersRepository {
	// eslint-disable-next-line
	public users: any[] = []

	async create(data: Prisma.UserCreateInput) {
		this.users.push(data)

		return data
	}
}
