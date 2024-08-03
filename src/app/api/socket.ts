// import { NextApiRequest } from 'next'
// import { Server } from 'socket.io'

// const SocketHandler = (req: NextApiRequest, res: any) => {
// 	if (res.socket.server.io) {
// 		console.log('Socket is already running')
// 	} else {
// 		console.log('Socket is initializing')
// 		const io = new Server(res.socket.server)
// 		res.socket.server.io = io

// 		let key: string | undefined
// 		io.use((socket, next) => {
// 			key = socket.handshake.auth.key
// 		})

// 		io.on('connection', (socket) => {
// 			const intervalId = setInterval(() => {

// 				if (key) socket.emit('message', key)
// 			}, 5000)

// 			socket.on('disconnect', () => clearInterval(intervalId))
// 		})
// 	}
// 	res.end()
// }

// export default SocketHandler

import { NextApiRequest } from 'next'
import { Server } from 'socket.io'
import { parse } from 'cookie'

let io: Server | null = null

export default function handler(req: NextApiRequest, res: any) {
	// const cookies = req.headers.cookie
	// let key: string | undefined
	// if (cookies) {
	// 	const parsedCookies = parse(cookies)
	// 	key = parsedCookies.key
	// }

	if (req.method === 'GET') {
		if (!io && res.socket) {
			io = new Server(res.socket.server, { path: '/api/socket' })

			io.on('connection', (socket) => {
				const intervalId = setInterval(() => {
					// if (key) {
					// 	socket.emit('message', key)
					// }
				}, 5000)

				socket.on('disconnect', () => {
					clearInterval(intervalId)
				})
			})
		}

		res.status(200).send('Socket.io server is running')
	} else {
		res.status(405).end()
	}
}
