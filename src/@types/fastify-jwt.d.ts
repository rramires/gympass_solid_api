// https://github.com/fastify/fastify-jwt?tab=readme-ov-file#typescript-1
import '@fastify/jwt'

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		user: {
			sub: string
			role: 'ADMIN' | 'MEMBER'
		}
	}
}
