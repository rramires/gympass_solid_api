import { IUsersRepository } from '@/repositories/i-users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
	name: string
	email: string
	password: string
}

export class RegisterUseCase {
	constructor(private usersRepository: IUsersRepository) {}
	/* 
		Hack: Using "private" or "public" in the constructor parameters does 
		the same as declaring the property before the constructor and then assigning this:
		
		private usersRepository: any
		constructor(usersRepository: any) {
			this.usersRepository = usersRepository
		}
	*/

	async execute({ name, email, password }: RegisterUseCaseRequest) {
		// check email
		const userWithSameEmail = await this.usersRepository.findByEmail(email)
		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}
		// hash
		const password_hash = await hash(password, 12)
		// call persistence
		await this.usersRepository.create({
			name,
			email,
			password_hash,
		})
	}
}
