import { create } from 'zustand'
import hr1Data from '../data/hr1.json'
import hr2Data from '../data/hr2.json'
import hr3Data from '../data/hr3.json'
import step1Data from '../data/step1.json'
import step2Data from '../data/step2.json'

interface DatastreamOverview {
	id: number
	value: number
	unit: string
	categoryDescription: string
	classes: string[]
	createdAt: string
	color: string
	domain: number[]
}

interface State {
	overviews: DatastreamOverview[]
	datastreamsById: Record<number, { x: number; y: number }[]>
	setOverviews: (newData: DatastreamOverview[]) => void
}

const hr1 = hr1Data.map(([x, y]) => ({ x, y }))
const hr2 = hr2Data.map(([x, y]) => ({ x, y }))
const hr3 = hr3Data.map(([x, y]) => ({ x, y }))

function accumulateSteps(data: any[]) {
	let acc = 0
	let newData = data.map((e) => {
		acc += e.steps
		return { x: new Date(e.startGMT).getTime(), y: acc }
	})
	return newData
}

const step1 = accumulateSteps(step1Data)
const step2 = accumulateSteps(step2Data)

const initialData = [
	{
		id: 1,
		value: 65,
		unit: 'bpm',
		categoryDescription: 'Heart Rate',
		classes: ['Health', 'Heart'],
		createdAt: new Date().toISOString(),
		color: 'red',
		domain: [20, 220],
	},
	{
		id: 2,
		value: 6000,
		unit: '',
		categoryDescription: 'Step Count',
		classes: ['Health', 'Movement'],
		createdAt: new Date().toISOString(),
		color: 'green',
		domain: [0, Math.floor(Math.max(...step1.map((e) => e.y)) * 1.1)],
	},
	{
		id: 3,
		value: 165,
		unit: 'bpm',
		categoryDescription: 'Heart Rate',
		classes: ['Health', 'Heart'],
		createdAt: new Date().toISOString(),
		color: 'blue',
		domain: [20, 220],
	},
	{
		id: 4,
		value: 8000,
		unit: '',
		categoryDescription: 'Step Count',
		classes: ['Health', 'Movement'],
		createdAt: new Date().toISOString(),
		color: 'purple',
		domain: [0, Math.floor(Math.max(...step2.map((e) => e.y)) * 1.1)],
	},
]

const useStore = create<State>((set) => ({
	overviews: initialData,
	datastreamsById: { 1: hr1, 2: step1, 3: hr2, 4: step2 },
	setOverviews: (newData: DatastreamOverview[]) => set((state) => ({ ...state, overviews: newData })),
}))

export default useStore
