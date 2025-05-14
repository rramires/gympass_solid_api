/* import { Prisma } from '@/prisma-client'
import { UsersRepository } from './users-repository'

export class InMemoryUsersRepository implements UsersRepository {
	// eslint-disable-next-line
	public users: any[] = []

	async create(data: Prisma.UserCreateInput) {
		this.users.push(data)

		return
	}
} */
