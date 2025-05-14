import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseRequest {
	name: string
	email: string
	password: string
}

export async function regirsterUseCase({ name, email, password }: RegisterUseCaseRequest) {
	const userWithSameEmail = await prisma.user.findUnique({
		where: {
			email,
		},
	})
	if (userWithSameEmail) {
		throw new Error('E-mail already exists.')
	}

	const password_hash = await hash(password, 12)

	const usersRepository = new UsersRepository()
	await usersRepository.create({
		name,
		email,
		password_hash,
	})
}
