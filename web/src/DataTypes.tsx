import { FilePen } from '@tamagui/lucide-icons'
import 'primeicons/primeicons.css'
import { Button as PRButton } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import { Slider } from 'primereact/slider'
import { useEffect, useState } from 'react'
import { Button, Heading, XStack, YStack } from 'tamagui'

const products = [
	{ description: 'Heart Rate', category: ['Heart', 'Health'], sampling_rate: 'every 2 min', unit: 'bpm', p: 451, q: 700 },
	{ description: 'Resting Heart Rate', category: ['Heart', 'Health'], sampling_rate: 'every day', unit: 'bpm', p: 760, q: 311 },
	{ description: 'Step Count', category: ['Health', 'Movement'], sampling_rate: 'every 5 min', unit: 'count', p: 1080, q: 2041 },
	{ description: 'Sleep Duration', category: ['Health', 'Sleep'], sampling_rate: 'every day', unit: 'min', p: 700, q: 1100 },
	{ description: 'REM', category: ['Health', 'Sleep'], sampling_rate: 'every day', unit: 'min', p: 420, q: 420 },
	{ description: 'Social Interactions', category: ['Social'], sampling_rate: 'every 5 min', unit: 'min', p: 208, q: 520 },
]

const itemsBody = (row: any) => (row.category ?? []).join(', ')

export default function () {
	const maxDays = Math.max(...products.map((e) => e.q))

	const [isVisible, setVisible] = useState(false)
	const [project, setProject] = useState<any>()
	const [range, setRange] = useState<any>([0, maxDays])
	const [description, setDescription] = useState<any>('')
	const [selectedProducts, setSelectedProducts] = useState<any[]>([])
	const n1 = selectedProducts.length > 0 ? Math.min(...selectedProducts.map((e) => e.p)) : Math.max(...products.map((e) => e.p))
	const proportionalN1 = Math.round((n1 * (range[1] - range[0])) / maxDays)
	const n2 = selectedProducts.length > 0 ? Math.min(...selectedProducts.map((e) => e.q)) : Math.max(...products.map((e) => e.q))

	useEffect(() => {
		setRange([range[0], n2])
	}, [selectedProducts.length])

	return (
		<>
			<XStack bg="#eee" width="100%" justify="center" flex={1} pt="$5">
				<XStack bg="white" maxW={1280} flex={1}>
					<YStack flex={1} style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
						<XStack p="$4" justify="space-between">
							<Heading mr="$5">There are {proportionalN1} individuals with data collected.</Heading>
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
						<XStack p="$4" justify="space-between">
							<YStack gap="$2">
								<label>Min Days</label>
								<InputText value={range[0]} />
							</YStack>
							<YStack gap="$2">
								<label>Max Days</label>
								<InputText value={range[1]} />
							</YStack>
						</XStack>
						<XStack p="$5" pt={0}>
							<Slider style={{ flex: 1 }} min={0} max={maxDays} value={range} onChange={(e) => setRange(e.value)} range />
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

					<label style={{ paddingTop: 10 }}>Description</label>
					<InputTextarea
						value={description}
						onChange={(e) => {
							setDescription(e.target.value)
						}}
						rows={10}
						cols={30}
					/>
					<PRButton label="Request" disabled={!project || !description} />
				</YStack>
			</Dialog>
		</>
	)
}
