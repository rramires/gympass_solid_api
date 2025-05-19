import { IUsersRepository } from '@/repositories/i-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@/prisma-client'

interface AuthenticateCaseRequest {
	email: string
	password: string
}

interface AuthenticateUseCaseResponse {
	user: User
}

export class AuthenticateUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email)
		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordsMatches = await compare(password, user.password_hash)
		if (!doesPasswordsMatches) {
			throw new InvalidCredentialsError()
		}

		return {
			user,
		}
	}
}
