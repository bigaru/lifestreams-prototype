import { create } from 'zustand'
import hr1Data from '../data/hr1.json'
import hr2Data from '../data/hr2.json'
import hr3Data from '../data/hr3.json'

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

const hr1 = hr1Data.map(([x, y]) => ({ x, y }))
const hr2 = hr2Data.map(([x, y]) => ({ x, y }))
const hr3 = hr3Data.map(([x, y]) => ({ x, y }))

const useStore = create<State>((set) => ({
	overviews: initialData,
	datastreamsById: { 1: hr1, 2: hr2, 3: hr3 },
	setOverviews: (newData: DatastreamOverview[]) => set((state) => ({ ...state, overviews: newData })),
}))

export default useStore
