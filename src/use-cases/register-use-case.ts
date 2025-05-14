import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
	name: string
	email: string
	password: string
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}
	/* 
		Hack: Using "private" or "public" in the constructor parameters does 
		the same as declaring the property before the constructor and then assigning this:
		
		private usersRepository: any
		constructor(usersRepository: any) {
			this.usersRepository = usersRepository
		}
	*/

	async execute({ name, email, password }: RegisterUseCaseRequest) {
		const userWithSameEmail = await this.usersRepository.findByEmail(email)
		if (userWithSameEmail) {
			throw new Error('E-mail already exists.')
		}

		const password_hash = await hash(password, 12)

		await this.usersRepository.create({
			name,
			email,
			password_hash,
		})
	}
}
