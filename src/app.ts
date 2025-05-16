import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()
// Routes
app.register(appRoutes)
// Errors
app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: error.format(),
		})
	}
	if (env.NODE_ENV !== 'production') {
		console.error(error)
	} else {
		// TODO: Here we should log to an external tool like Datadog/NewRelic/Sentry etc
	}
	// Other errors
	return reply.status(500).send({ message: 'Internal server error.' })
})
