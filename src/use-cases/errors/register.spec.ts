import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from '../register-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Register Use Case', () => {
	it('should be possible to hash the password when registering a new user', async () => {
		// in-memory mock database
		const usersRepository = new InMemoryUsersRepository()
		const registerUsecase = new RegisterUseCase(usersRepository)

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
