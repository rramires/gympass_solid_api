import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate-use-case'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './invalid-credentials-error'

describe('Authenticate Use Case', () => {
	it('should be able to authenticate', async () => {
		const newUser = {
			name: 'Jhon Doe',
			email: 'jhondoe@email.com',
			password: 'abc123',
		}
		const usersRepository = new InMemoryUsersRepository()
		await usersRepository.create({
			name: newUser.name,
			email: newUser.email,
			password_hash: await hash(newUser.password, 12),
		})

		const sut = new AuthenticateUseCase(usersRepository)

		// authenticate
		const { user } = await sut.execute({
			email: newUser.email,
			password: newUser.password,
		})
		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		const newUser = {
			name: 'Jhon Doe',
			email: 'jhondoe@email.com',
			password: 'abc123',
		}
		const usersRepository = new InMemoryUsersRepository()
		await usersRepository.create({
			name: newUser.name,
			email: newUser.email,
			password_hash: await hash(newUser.password, 12),
		})

		const sut = new AuthenticateUseCase(usersRepository)

		// authenticate with wrong email
		await expect(
			sut.execute({
				email: 'wrong@email.com',
				password: newUser.password,
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate (password)', async () => {
		const newUser = {
			name: 'Jhon Doe',
			email: 'jhondoe@email.com',
			password: 'abc123',
		}
		const usersRepository = new InMemoryUsersRepository()
		await usersRepository.create({
			name: newUser.name,
			email: newUser.email,
			password_hash: await hash(newUser.password, 12),
		})

		const sut = new AuthenticateUseCase(usersRepository)

		// authenticate with wrong password
		await expect(
			sut.execute({
				email: newUser.email,
				password: 'wrongPassword',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
