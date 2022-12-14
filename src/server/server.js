const fastify = require('fastify')({ logger: false });
fastify.register(require('./routes/router'));


fastify.register(require('fastify-cors'), {
  origin: true
})

fastify.register(require('fastify-websocket'), {
  handle,
  options: {
    maxPayload: 1048576,
    clientTracking: true,
  },
})

function handle(conn) {
  conn.pipe(conn)
}

fastify.get('/', { websocket: true }, (connection, req) => {
  connection.socket.on('message', (data) => {
    try {
      fastify.websocketServer.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(data)
        }
      });
    } catch (error) {
      console.error(error)
    }
  })
})

const start = async () => {
  try {
    const PORT = process.env.PORT || 8080
    await fastify.listen(PORT)

    console.log(`Servidor rodando em http://localhost:${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
