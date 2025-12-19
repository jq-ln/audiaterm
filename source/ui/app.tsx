import { useState } from 'react';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import { IFluidSynthClient } from '../audio/fluidsynthClient.js';

interface Item {
	label: string
	value: string
}

interface SidebarProps {
	onSelect(item: Item): void
}

interface UpperPaneProps {
	content: string
}

const sidebarItems: Item[] = [
	{ label: 'sidebarItem1', value: 'Sidebar Item 1' },
	{ label: 'sidebarItem2', value: 'Sidebar Item 2' },
	{ label: 'synth', value: 'Synth' },
	{ label: 'exit', value: 'Exit' },
]

const upperPaneItems: Item[] = [
	{ label: 'upperPaneItem1', value: 'Upper Pane Item 1' },
	{ label: 'upperPaneItem2', value: 'Upper Pane Item 2' },
]

function Sidebar({ onSelect }: SidebarProps) {
	return (
		<Box flexDirection='column' width={40} height={'100%'} borderStyle={'double'} borderColor={'blue'} paddingLeft={3} paddingRight={3} paddingTop={1} >
			<SelectInput items={sidebarItems} onSelect={onSelect} />
		</Box>
	)
}

function UpperPane({ content }: UpperPaneProps) {
	const handleSelect = (): void => {
		return;
	}

	return (
		<Box flexDirection='row' width={'100%'} height={'100%'} borderStyle={'double'} borderColor={'blue'} paddingLeft={3} paddingRight={3} paddingTop={1} justifyContent='center'>
			<Text>{content}</Text>
			<SelectInput items={upperPaneItems} onSelect={handleSelect} isFocused={false} />
		</Box>
	)
}

interface AppProps {
	synth: IFluidSynthClient
	onExit(exit: () => void): void
}

export default function App({ synth, onExit }: AppProps) {
	const { exit } = useApp();

	const defaultContent = "No Selection";
	const [currentContent, setCurrentContent] = useState<string>(defaultContent);

	const handleSidebarSelect = (item: Item): void => {
		switch (item.label) {
			case 'synth':
				synth.playNote({ name: "C", octave: 4 });
				setCurrentContent("Playing Note: C4");
				break;
			case 'exit':
				onExit(exit);
				break;
			default:
				setCurrentContent(item.value);
		}
	}

	return (
		<Box>
			<Sidebar onSelect={handleSidebarSelect} />
			<UpperPane content={currentContent} />
		</Box>
	);
}
