import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from '../register-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './user-already-exists-error'

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

	it('should not be able to register with same email twice', async () => {
		// in-memory mock database
		const usersRepository = new InMemoryUsersRepository()
		const registerUsecase = new RegisterUseCase(usersRepository)

		const newUser = {
			name: 'Jhon Doe',
			email: 'jhondoe@email.com',
			password: 'abc123',
		}
		// add
		await registerUsecase.execute(newUser)

		// add same email - return error
		expect(registerUsecase.execute(newUser)).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})

	it('should be able to register', async () => {
		// in-memory mock database
		const usersRepository = new InMemoryUsersRepository()
		const registerUsecase = new RegisterUseCase(usersRepository)

		// add
		const { user } = await registerUsecase.execute({
			name: 'Jhon Doe',
			email: 'jhondoe@email.com',
			password: 'abc123',
		})
		// return id string
		expect(user.id).toEqual(expect.any(String))
	})
})
