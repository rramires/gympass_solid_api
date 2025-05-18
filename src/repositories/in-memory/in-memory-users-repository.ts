import { Prisma, User } from '@/prisma-client'
import { IUsersRepository } from '../i-users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
	// in-memory mock database
	public items: User[] = []

	async findByEmail(email: string): Promise<User | null> {
		// find by email
		const user = this.items.find((item) => item.email === email)

		return user || null
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		// new user
		const user = {
			id: `user-${this.items.length + 1}`,
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		}

		this.items.push(user)

		return user
	}
}
