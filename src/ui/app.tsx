import { useState } from 'react';
import { Box, useApp } from 'ink';
import { UpperPane, MenuMapKey } from './components/UpperPane.js';
import { Sidebar } from './components/Sidebar.js';
import { Item, Pane, IFluidSynthClient } from '../types.js'

export interface AppProps {
	synth: IFluidSynthClient
	onExit(exit: () => void): void
}

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
