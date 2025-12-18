import { Text, Box } from 'ink';

function Sidebar() {
	return (
		<Box flexDirection='column' width={50}>
			<Text>Sidebar</Text>
		</Box>
	)
}

export default function App() {
	return (
		<Box>
			<Sidebar />
		</Box>
	);
}
