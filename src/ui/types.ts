import { ComponentType } from 'react';
import { FluidSynthApi } from '../types.js';

export interface Item {
	label: string
	value: string
}

export interface PaneProps {
	isFocused: boolean
	onUnfocus(): void
}

export interface PanePropsWithSynth extends PaneProps {
	synth: FluidSynthApi
}

export interface SidebarProps extends PaneProps {
	onSelect(item: Item): void | Promise<void>
}

export type MenuComponent = ComponentType<PanePropsWithSynth>
export type Pane = 'sidebar' | 'upper'
