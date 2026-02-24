import { create } from 'zustand'
import hrData from '../data/hr.json'

interface DatastreamOverview {
	id: number
	value: number
	unit: string
	categoryDescription: string
	classes: string[]
	createdAt: string
}

interface State {
	overviews: DatastreamOverview[]
	datastreamsById: Record<number, { x: number; y: number }[]>
	setOverviews: (newData: DatastreamOverview[]) => void
}

const initialData = [
	{ id: 1, value: 65, unit: 'bpm', categoryDescription: 'Heart Rate', classes: ['Health', 'Heart'], createdAt: new Date().toISOString() },
	{ id: 2, value: 6000, unit: '', categoryDescription: 'Step Count', classes: ['Health', 'Movement'], createdAt: new Date().toISOString() },
	{ id: 3, value: 7.5, unit: 'h', categoryDescription: 'Sleep', classes: ['Health'], createdAt: new Date().toISOString() },
]

const useStore = create<State>((set) => ({
	overviews: initialData,
	datastreamsById: { 1: hrData },
	setOverviews: (newData: DatastreamOverview[]) => set((state) => ({ ...state, overviews: newData })),
}))

export default useStore
