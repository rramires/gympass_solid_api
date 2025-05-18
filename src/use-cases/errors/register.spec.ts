import { expect, describe, it } from 'vitest'
import { IUsersRepository } from '@/repositories/i-users-repository'
import { RegisterUseCase } from '../register-use-case'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
	it('should be possible to hash the password when registering a new user', async () => {
		const mockUsersRepository: IUsersRepository = {
			async findByEmail() {
				return null
			},
			async create(data) {
				return {
					id: 'user-1',
					name: data.name,
					email: data.email,
					password_hash: data.password_hash,
					created_at: new Date(),
				}
			},
		}

		const registerUsecase = new RegisterUseCase(mockUsersRepository)

		const password = 'abc123'
		const { user } = await registerUsecase.execute({
			name: 'Jhon Doe',
			email: 'jhondoe@email.com',
			password,
		})

		const isPasswordCorrectHashed = await compare(password, user.password_hash)
		expect(isPasswordCorrectHashed).toBe(true)
	})
})
