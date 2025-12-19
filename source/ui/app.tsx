import { Text, Box } from 'ink';
import { IFluidSynthClient } from '../audio/fluidsynthClient.js';

function Sidebar() {
	return (
		<Box flexDirection='column' width={50}>
		</Box>
	)
}

interface AppProps {
	synth: IFluidSynthClient
}

export default function App({ synth }: AppProps) {
	return (
		<Box>
			<Sidebar />
		</Box>
	);
}
