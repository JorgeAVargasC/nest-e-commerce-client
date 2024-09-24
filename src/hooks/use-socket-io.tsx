/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@/lib'
import { useEffect, useState, useRef } from 'react'
import { Manager, Socket } from 'socket.io-client'

export const useSocketIo = () => {
	const url = 'http://localhost:3000'

	const managerRef = useRef<Manager | null>(null)
	const socketRef = useRef<Socket | null>(null)

	const [isConnected, setIsConnected] = useState(false)
	const [events, setEvents] = useState<any[]>([])
	const [clients, setClients] = useState<string[]>([])
	const [messages, setMessages] = useState<{ fullName: string; msg: string }[]>(
		[]
	)

	const onConnect = () => {
		setIsConnected(true)
		logger.log('Connected to server')
	}

	const onDisconnect = () => {
		setIsConnected(false)
		logger.error('Disconnected from server')
	}

	const onEvents = (data: any) => {
		setEvents((prevEvents) => [...prevEvents, data])
	}

	const onClientsUpdated = (clients: string[]) => {
		setClients(clients)
	}

	const onMessagesFromServer = (messages: {
		fullName: string
		msg: string
	}) => {
		setMessages((prevMessages) => [...prevMessages, messages])
	}

	useEffect(() => {
		// Create Manager and socket only once
		if (!managerRef.current) {
			managerRef.current = new Manager(url)
			socketRef.current = managerRef.current.socket('/')
		}

		const socket = socketRef.current

		socket?.on('connect', onConnect)
		socket?.on('disconnect', onDisconnect)
		socket?.on('events', onEvents)

		socket?.on('clients-updated', onClientsUpdated)

		socket?.on('message-from-server', onMessagesFromServer)

		return () => {
			socket?.off('connect', onConnect)
			socket?.off('disconnect', onDisconnect)
			socket?.off('events', onEvents)
			socket?.off('clients-updated', onClientsUpdated)
		}
	}, [])

	return {
		isConnected,
		events,
		clients,
		socketRef,
		messages
	}
}
