import { useState, ComponentType } from 'react';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import { IFluidSynthClient } from '../audio/fluidsynthClient.js';
import { Note } from '../audio/fluidsynthClient.js'

interface Item {
	label: string
	value: string
}

interface PaneProps {
	isFocused: boolean
	onUnfocus(): void
}

interface PanePropsWithSynth extends PaneProps {
	synth: IFluidSynthClient
}

interface SidebarProps extends PaneProps {
	onSelect(item: Item): void
}

interface UpperPaneProps extends PanePropsWithSynth {
	menuLabel: MenuMapKey
}

const sidebarItems: Item[] = [
	{ label: 'synth', value: 'Synth' },
	{ label: 'exit', value: 'Exit' },
]

const synthMenuItems: Item[] = [
	{ label: 'playNote', value: 'Play Note' },
	{ label: 'playInterval', value: 'PlayInterval' },
	{ label: 'back', value: 'Back' }
]

type MenuComponent = ComponentType<PanePropsWithSynth>
type MenuMapKey = keyof typeof menuMap;

const menuMap: Record<string, MenuComponent> = {
	'none': DefaultMenu,
	'synth': SynthMenu,
}

function DefaultMenu() {
	return (
		<Text>No Selection</Text>
	)
}

function SynthMenu({ synth, isFocused, onUnfocus }: PanePropsWithSynth) {
	const rootNote: Note = { name: 'C', octave: 4 }
	const handleSelect = (item: Item): void => {
		switch (item.label) {
			case 'playNote':
				synth.playNote(rootNote);
				break;
			case 'back':
				onUnfocus();
				break;
		}
	}
	return (
		<>
			<SelectInput items={synthMenuItems} isFocused={isFocused} onSelect={handleSelect} />
		</>
	)
}

function Sidebar({ onSelect, isFocused }: SidebarProps) {
	return (
		<Box flexDirection='column' width={40} height={'100%'} borderStyle={'double'} borderColor={'blue'} paddingLeft={3} paddingRight={3} paddingTop={1} >
			<SelectInput items={sidebarItems} onSelect={onSelect} isFocused={isFocused} />
		</Box>
	)
}

function UpperPane({ synth, menuLabel, isFocused, onUnfocus }: UpperPaneProps) {
	const Menu: MenuComponent = menuMap[menuLabel] as MenuComponent;

	return (
		<Box flexDirection='row' width={'100%'} height={'100%'} borderStyle={'double'} borderColor={'blue'} paddingLeft={3} paddingRight={3} paddingTop={1} justifyContent='center'>
			<Menu synth={synth} isFocused={isFocused} onUnfocus={onUnfocus} />
		</Box>
	)
}

interface AppProps {
	synth: IFluidSynthClient
	onExit(exit: () => void): void
}

type Pane = 'sidebar' | 'upper'

export default function App({ synth, onExit }: AppProps) {
	const { exit } = useApp();
	const defaultFocusedPane = 'sidebar';
	const noMenu = 'none';

	const [currentMenu, setCurrentMenu] = useState<MenuMapKey>(noMenu);
	const [focusedPane, setFocusedPane] = useState<Pane>(defaultFocusedPane);

	const handleSidebarSelect = (item: Item): void => {
		switch (item.label) {
			case 'synth':
				setFocusedPane('upper');
				setCurrentMenu('synth')
				break;
			case 'exit':
				onExit(exit);
				break;
			default:
				break;
		}
	}

	const handleUnfocus = (): void => {
		setFocusedPane(defaultFocusedPane);
		setCurrentMenu(noMenu);
	}

	return (
		<Box>
			<Sidebar onSelect={handleSidebarSelect} isFocused={focusedPane === 'sidebar'} onUnfocus={handleUnfocus} />
			<UpperPane synth={synth} menuLabel={currentMenu} isFocused={focusedPane === 'upper'} onUnfocus={handleUnfocus} />
		</Box>
	);
}
