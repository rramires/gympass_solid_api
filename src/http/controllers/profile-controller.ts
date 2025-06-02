import { FastifyRequest, FastifyReply } from 'fastify'
export async function profileController(request: FastifyRequest, reply: FastifyReply) {
	// console.log(request.headers)
	// Validate JWT token
	await request.jwtVerify()
	// Get the authenticated user ID
	console.log('User ID:', request.user.sub)

	return reply.status(200).send()
}
