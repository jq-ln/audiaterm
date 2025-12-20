import { ComponentType } from 'react';
import { IFluidSynthClient } from '../types.js';

export interface Item {
	label: string
	value: string
}

export interface PaneProps {
	isFocused: boolean
	onUnfocus(): void
}

export interface PanePropsWithSynth extends PaneProps {
	synth: IFluidSynthClient
}

export interface SidebarProps extends PaneProps {
	onSelect(item: Item): void
}

export type MenuComponent = ComponentType<PanePropsWithSynth>
export type Pane = 'sidebar' | 'upper'
