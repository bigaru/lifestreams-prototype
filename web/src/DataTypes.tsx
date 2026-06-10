import { Heading, XStack, YStack, Button } from 'tamagui'
import 'primeicons/primeicons.css'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import { useState } from 'react'
import { FilePen } from '@tamagui/lucide-icons'
import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar'
import { Button as PRButton } from 'primereact/button'

const products = [
	{ description: 'Heart Rate', category: ['Heart', 'Health'], sampling_rate: 'every 2 min', unit: 'bpm', p: 10, q: 500 },
	{ description: 'Resting Heart Rate', category: ['Heart', 'Health'], sampling_rate: 'every day', unit: 'bpm', p: 260, q: 311 },
	{ description: 'Step Count', category: ['Health', 'Movement'], sampling_rate: 'every 5 min', unit: 'count', p: 580, q: 20041 },
	{ description: 'Sleep Duration', category: ['Health', 'Sleep'], sampling_rate: 'every day', unit: 'min', p: 7, q: 1100 },
	{ description: 'REM', category: ['Health', 'Sleep'], sampling_rate: 'every day', unit: 'min', p: 2, q: 42 },
	{ description: 'Social Interactions', category: ['Social'], sampling_rate: 'every 5 min', unit: 'min', p: 68, q: 100 },
]

const itemsBody = (row: any) => (row.category ?? []).join(', ')

export default function () {
	const [isVisible, setVisible] = useState(false)
	const [dates, setDates] = useState<any>()
	const [project, setProject] = useState<any>()
	const [description, setDescription] = useState<any>('')
	const [selectedProducts, setSelectedProducts] = useState<any[]>([])
	const n1 = selectedProducts.length > 0 ? Math.min(...selectedProducts.map((e) => e.p)) : Math.max(...products.map((e) => e.p))
	const n2 = selectedProducts.length > 0 ? Math.min(...selectedProducts.map((e) => e.q)) : Math.max(...products.map((e) => e.q))

	return (
		<>
			<XStack bg="#eee" width="100%" justify="center" flex={1} pt="$5">
				<XStack bg="white" maxW={1280} flex={1}>
					<YStack flex={1} style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
						<XStack p="$4" justify="space-between">
							<Heading mr="$5">
								There are {n1} individuals with data collected over approximately {n2} days.
							</Heading>
							<Button
								icon={FilePen}
								fontSize="$5"
								theme={selectedProducts.length > 0 ? 'blue' : null}
								onPress={() => setVisible(true)}
								disabled={selectedProducts.length === 0}
							>
								Request Data
							</Button>
						</XStack>
						<DataTable value={products} selection={selectedProducts} onSelectionChange={(e: any) => setSelectedProducts(e.value)} dataKey="description">
							<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
							<Column field="description" sortable filter header="Description"></Column>
							<Column header="Category" sortable filter body={itemsBody}></Column>
							<Column field="sampling_rate" sortable filter header="Sampling Rate"></Column>
							<Column field="unit" sortable filter header="Unit"></Column>
						</DataTable>
					</YStack>
				</XStack>
			</XStack>
			<Dialog visible={isVisible} onHide={() => setVisible(false)} position="top" style={{ width: '50vw' }}>
				<YStack gap="$3">
					<label>Project</label>
					<Dropdown
						value={project}
						onChange={(e) => setProject(e.value)}
						options={['Project A', 'Project XYZ']}
						placeholder="Select Project"
						className="w-full"
					/>

					<label style={{ paddingTop: 10 }}>Time Frame</label>
					<Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />

					<label style={{ paddingTop: 10 }}>Description</label>
					<InputTextarea
						value={description}
						onChange={(e) => {
							setDescription(e.target.value)
						}}
						rows={10}
						cols={30}
					/>
					<PRButton label="Request" disabled={!project || !dates || !description} />
				</YStack>
			</Dialog>
		</>
	)
}
