import express from 'express'
import next from 'next'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = Number(process.env.PORT) || 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

const setupSocketIO = (server) => {
	const io = new SocketIOServer(server)

	io.on('connection', (socket) => {
		console.log('Client connected')
		const key = socket.handshake.auth.token
		console.log('18----server', key)
		const intervalId = setInterval(() => {
			io.emit('message', key)
		}, 5000)

		socket.on('disconnect', () => {
			clearInterval(intervalId)
			console.log('Client disconnected')
		})
	})
}

const setupExpressAndNext = () => {
	const server = express()
	const httpServer = http.createServer(server)

	server.all('*', (req, res) => {
		return handler(req, res)
	})

	setupSocketIO(httpServer)

	return httpServer
}

const startServer = () => {
	const httpServer = setupExpressAndNext()

	httpServer.listen(port, () => {
		console.log(`Server is running on 'http://localhost:${port}'`)
	})
}

app.prepare().then(() => {
	startServer()
})
