import { Circle, Line as SkiaLine, Text as SkiaText, useFont } from '@shopify/react-native-skia'
import { useState } from 'react'
import { useDerivedValue } from 'react-native-reanimated'
import { View, YStack, type ViewProps } from 'tamagui'
import { CartesianChart, Line, useChartPressState, useChartTransformState } from 'victory-native'
import inter from '../assets/inter-medium.ttf'

type Point = { x: number; y: number }
type MultiPoint = { x: number; y1?: number; y2?: number }

function zipAlongXCoord(a: Point[], b: Point[]): MultiPoint[] {
	const ma = new Map(a.map((p) => [p.x, p.y] as const))
	const mb = new Map(b.map((p) => [p.x, p.y] as const))
	const xs = new Set([...a.map((p) => p.x), ...b.map((p) => p.x)])

	return [...xs].sort().map((x) => ({ x, y1: ma.get(x), y2: mb.get(x) }))
}

interface ChartProps {
	color: string[]
	data: Point[][]
	unit: string[]
	domain: [number, number][]
}

type ChartWrapperProps = { isComparison: boolean } & ChartProps & ViewProps

const X_DOMAIN_DAY: [number, number] = [0, 24 * 60]

function findClosestPoint(data: MultiPoint[], targetX: number): MultiPoint | null {
	'worklet'
	if (!data.length || data[data.length - 1].x < targetX) return null

	return data.reduce((closest, point) => {
		const d1 = Math.abs(point.x - targetX)
		const d2 = Math.abs(closest.x - targetX)

		if (d1 < d2) return point
		if (d1 > d2) return closest
		return point.x < closest.x ? point : closest
	})
}

export function ChartComponent(props: ChartWrapperProps) {
	const { isComparison, unit, color, data, domain, ...ViewProps } = props

	return (
		<YStack items="center" justify="center" flex={1}>
			<View flex={1} {...ViewProps}>
				{isComparison ? (
					<DualAxisChart unit={unit} color={color} data={data} domain={domain} />
				) : (
					<SingleChart unit={unit} color={color} data={data} domain={domain} />
				)}
			</View>
		</YStack>
	)
}

function SingleChart(props: ChartProps) {
	const { color, data, unit, domain } = props
	const font = useFont(inter, 12)
	const fontTooltip = useFont(inter, 18)

	const [chartTop, setChartTop] = useState(0)
	const [chartBottom, setChartBottom] = useState(0)

	const { state, isActive } = useChartPressState({ x: 0, y: { y: 0 } })
	const { state: transformState } = useChartTransformState()

	const verticalLine_p1 = useDerivedValue(() => ({ x: state.x.position.value, y: chartTop }))
	const verticalLine_p2 = useDerivedValue(() => ({ x: state.x.position.value, y: chartBottom }))

	const toolTipLabel = useDerivedValue(() => {
		const n = state.y.y.value.value
		if (!Number.isFinite(n)) {
			return '-'
		}
		return n.toFixed(0)
	})
	const realingedX = useDerivedValue(() => state.x.position.value - 12)

	return (
		<>
			<CartesianChart
				data={data[0]}
				domain={{ y: domain[0] }}
				padding={{ top: 30 }}
				xKey={'x'}
				yKeys={['y']}
				yAxis={[{ font: font }]}
				xAxis={
					{
						//font: font,
						//formatXLabel: (min) => String(Math.floor(min / 60)).padStart(2, '0'),
						//tickCount: 8,
					}
				}
				chartPressState={state}
				transformConfig={{ pan: { enabled: false, dimensions: ['x'] }, pinch: { enabled: false, dimensions: ['x'] } }}
				transformState={transformState}
				onChartBoundsChange={({ top, bottom }) => {
					setChartTop(top)
					setChartBottom(bottom)
				}}
				renderOutside={() => (
					<>
						<SkiaText x={0} y={chartTop} font={font} text={unit[0]} />
						{isActive && <SkiaText x={realingedX} y={chartTop - 10} font={fontTooltip} text={toolTipLabel} />}
					</>
				)}
			>
				{({ points }) => (
					<>
						<Line points={points.y} color={color[0]} strokeWidth={1} />
						{isActive && (
							<>
								<SkiaLine p1={verticalLine_p1} p2={verticalLine_p2} strokeWidth={1} />
								<Circle cx={state.x.position} cy={state.y.y.position} r={6} color={'black'} />
							</>
						)}
					</>
				)}
			</CartesianChart>
		</>
	)
}

function DualAxisChart(props: ChartProps) {
	const {
		color,
		data: [firstData, secondData],
		unit,
		domain,
	} = props
	const font = useFont(inter, 12)
	const fontTooltip = useFont(inter, 18)

	const zippedData = zipAlongXCoord(firstData, secondData)
	const onlyY1Data = zippedData.filter((i) => i.y1)
	const onlyY2Data = zippedData.filter((i) => i.y2)

	const [chartTop, setChartTop] = useState(0)
	const [chartBottom, setChartBottom] = useState(0)

	const { state, isActive } = useChartPressState({ x: 0, y: { y1: 0, y2: 0 } })
	const { state: transformState } = useChartTransformState()

	const verticalLine_p1 = useDerivedValue(() => ({ x: state.x.position.value, y: chartTop }))
	const verticalLine_p2 = useDerivedValue(() => ({ x: state.x.position.value, y: chartBottom }))

	const toolTipLabel1 = useDerivedValue(() => {
		const n = state.y.y1.value.value
		if (!Number.isFinite(n)) {
			const found = findClosestPoint(onlyY1Data, state.x.value.value)
			return found ? (found.y1 ?? 0).toFixed(0) : '-'
		}
		return n.toFixed(0)
	})
	const toolTipLabel2 = useDerivedValue(() => {
		const n = state.y.y2.value.value
		if (!Number.isFinite(n)) {
			const found = findClosestPoint(onlyY2Data, state.x.value.value)
			return found ? (found.y2 ?? 0).toFixed(0) : '-'
		}
		return n.toFixed(0)
	})
	const realingedX1 = useDerivedValue(() => state.x.position.value - 12)
	const realingedX2 = useDerivedValue(() => state.x.position.value - 12)

	return (
		<>
			<CartesianChart
				data={zippedData}
				domain={{ x: X_DOMAIN_DAY }}
				padding={{ top: 50 }}
				xKey={'x'}
				yKeys={['y1', 'y2']}
				yAxis={[
					{ axisSide: 'left', font, yKeys: ['y1'], labelColor: color[0], domain: domain[0] },
					{ axisSide: 'right', font, yKeys: ['y2'], labelColor: color[1], domain: domain[1] },
				]}
				xAxis={{
					font: font,
					formatXLabel: (min) => String(Math.floor(min / 60)).padStart(2, '0'),
					tickCount: 8,
				}}
				chartPressState={state}
				transformConfig={{ pan: { enabled: false, dimensions: ['x'] }, pinch: { enabled: false, dimensions: ['x'] } }}
				transformState={transformState}
				onChartBoundsChange={({ top, bottom }) => {
					setChartTop(top)
					setChartBottom(bottom)
				}}
				renderOutside={({ chartBounds }) => (
					<>
						<SkiaText x={0} y={chartTop - 20} font={font} text={unit[0]} />
						<SkiaText x={chartBounds.right} y={chartTop - 20} font={font} text={unit[1]} />
						{isActive && (
							<>
								<SkiaText x={realingedX1} y={chartTop - 30} color={color[0]} font={fontTooltip} text={toolTipLabel1} />
								<SkiaText x={realingedX2} y={chartTop - 10} color={color[1]} font={fontTooltip} text={toolTipLabel2} />
							</>
						)}
					</>
				)}
			>
				{({ points }) => (
					<>
						<Line points={points.y1} color={color[0]} strokeWidth={1} connectMissingData />
						<Line points={points.y2} color={color[1]} strokeWidth={1} connectMissingData />
						{isActive && (
							<>
								<SkiaLine p1={verticalLine_p1} p2={verticalLine_p2} strokeWidth={1} />
							</>
						)}
					</>
				)}
			</CartesianChart>
		</>
	)
}
