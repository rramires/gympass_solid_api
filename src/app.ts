import fastify from 'fastify'

export const app = fastify()

app.get('/hello', () => {
	return 'Hello from Fastfy!'
})

// test in your browser with http://localhost:3333/hello
