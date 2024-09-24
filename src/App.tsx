import { Button } from '@components/ui/button'
import { useSocketIo, useTheme } from './hooks'
import { EventsTable } from './components/chat'
import { Badge } from './components/ui/badge'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from './components/ui/form'
import { Input } from './components/ui/input'
import { logger } from './lib'

function App() {
	const { theme, handleToggleTheme, icon, label } = useTheme()
	const { isConnected, clients, socketRef, messages } = useSocketIo()

	const methods = useForm({
		defaultValues: {
			msg: ''
		}
	})

	const onSubmit = methods.handleSubmit((data) => {
		logger.log(data.msg)
		socketRef.current?.emit('message-from-client', {
			id: 'YOO',
			msg: data.msg
		})

		methods.reset()
	})

	return (
		<body className={`${theme} grid min-h-svh place-items-center`}>
			<div className="container grid place-items-center gap-3 px-4 md:max-w-2xl">
				<div className="flex w-full items-center justify-between">
					<h1 className="font-bold">Nest E Commerce Client</h1>

					<Button
						onClick={handleToggleTheme}
						size={'sm'}
					>
						{icon}
						{label}
					</Button>
				</div>

				<Badge
					className={clsx({
						'bg-success text-white': isConnected,
						'bg-error text-white': !isConnected
					})}
				>
					{isConnected ? 'Connected' : 'Disconnected'}
				</Badge>

				<Form {...methods}>
					<form
						onSubmit={onSubmit}
						className="flex w-full items-center gap-2"
					>
						<FormField
							control={methods.control}
							name="msg"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<Input
											placeholder="Type your msg"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							size={'sm'}
						>
							Submit
						</Button>
					</form>
				</Form>

				<ul>
					{messages.map((msg) => (
						<li key={`${msg.fullName}-${msg.msg}`}>
							{msg.fullName}: {msg.msg}
						</li>
					))}
				</ul>

				<EventsTable events={clients} />
			</div>
		</body>
	)
}

export default App
