import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

type Props = {
	events: string[]
}

export const EventsTable: React.FC<Props> = ({ events }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Events</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{events.map((event) => (
					<TableRow key={event}>
						<TableCell className="font-medium">{event}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">{events.length}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}
