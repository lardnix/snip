import 'dotenv/config'

import Fastify from 'fastify'

const isDev = process.env.NODE_ENV == "development"
const app = Fastify({
    logger: isDev ? { transport: { target: 'pino-pretty' } }: true,
})

app.get('/health', async () => {
    return { status: 'ok' }
})

try {
    const port = Number(process.env.PORT ?? 3000)
    await app.listen({ port })
} catch (err) {
    app.log.error(err)
    process.exit(1)
}
