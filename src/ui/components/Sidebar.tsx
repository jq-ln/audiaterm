import SelectInput from "ink-select-input"
import { Box } from "ink"
import { Item, SidebarProps } from '../types.js'

const sidebarItems: Item[] = [
	{ label: 'synth', value: 'Synth' },
	{ label: 'exit', value: 'Exit' },
]

export function Sidebar({ onSelect, isFocused }: SidebarProps) {
	return (
		<Box flexDirection='column' width={40} height={'100%'} borderStyle={'double'} borderColor={'blue'} paddingLeft={3} paddingRight={3} paddingTop={1} >
			<SelectInput items={sidebarItems} onSelect={onSelect} isFocused={isFocused} />
		</Box>
	)
}

