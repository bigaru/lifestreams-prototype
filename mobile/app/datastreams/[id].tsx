import { Stack, useLocalSearchParams } from 'expo-router'
import { H3, YStack, View, XStack } from 'tamagui'
import { Area, CartesianChart, getTransformComponents, Line, useChartPressState, useChartTransformState } from 'victory-native'
import { Circle, useFont } from '@shopify/react-native-skia'
import { useDerivedValue, type SharedValue } from 'react-native-reanimated'
import inter from '../../assets/inter-medium.ttf'
import { Line as SkiaLine, Text as SkiaText } from '@shopify/react-native-skia'
import { useState } from 'react'

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const LEN = 61
const DATA = Array.from({ length: LEN }, (_, i) => ({
	day: i,
	highTmp: rand(-10, 35),
}))

const DATA2 = new Array(LEN)
for (let i = 0; i < LEN; i += 3) {
	const v = {
		day: i,
		highTmp: rand(-10, 35),
		steps: rand(5_000, 10_000),
	}
	DATA2[i] = v
	if (i + 1 < LEN) DATA2[i + 1] = { ...v, highTmp: rand(-10, 35), day: i + 1 }
	if (i + 2 < LEN) DATA2[i + 2] = { ...v, highTmp: rand(-10, 35), day: i + 2 }
}

function ToolTip({ x, y, color = 'black' }: { x: SharedValue<number>; y: SharedValue<number>; color?: string }) {
	return <Circle cx={x} cy={y} r={6} color={color} />
}

function ChartOne() {
	const font = useFont(inter, 12)
	const fontTooltip = useFont(inter, 18)

	const [chartTop, setChartTop] = useState(0)
	const [chartBottom, setChartBottom] = useState(0)

	const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } })
	const { state: transformState } = useChartTransformState()

	const verticalLine_p1 = useDerivedValue(() => ({ x: state.x.position.value, y: chartTop }))
	const verticalLine_p2 = useDerivedValue(() => ({ x: state.x.position.value, y: chartBottom }))

	const strokeW = useDerivedValue(() => {
		const vals = getTransformComponents(transformState.matrix.value)
		const sx = vals.scaleX ?? 1
		return 2 / sx
	})
	const strokeWHelpLine = useDerivedValue(() => {
		const vals = getTransformComponents(transformState.matrix.value)
		const sx = vals.scaleX ?? 1
		return 1 / sx
	})

	const toolTipLabel = useDerivedValue(() => {
		return state.y.highTmp.value.value.toFixed(2)
	})

	return (
		<>
			<YStack items="center" justify="center" flex={1}>
				<View my="$10" flex={1} width="90%">
					<H3 size="$5">pan & pinch along x-Axis</H3>
					<CartesianChart
						data={DATA}
						xKey="day"
						yKeys={['highTmp']}
						yAxis={[{ font: font, enableRescaling: true }]}
						xAxis={{ font: font, enableRescaling: true }}
						axisOptions={{ font }}
						chartPressState={state}
						transformConfig={{ pan: { enabled: true, dimensions: ['x'] }, pinch: { enabled: true, dimensions: ['x'] } }}
						transformState={transformState}
						gestureLongPressDelay={200}
						onChartBoundsChange={({ top, bottom }) => {
							setChartTop(top)
							setChartBottom(bottom)
						}}
					>
						{({ points }) => (
							<>
								<Line points={points.highTmp} color="red" strokeWidth={strokeW} />
								{isActive && (
									<>
										<SkiaLine p1={verticalLine_p1} p2={verticalLine_p2} strokeWidth={strokeWHelpLine} />
										<ToolTip x={state.x.position} y={state.y.highTmp.position} />
										<SkiaText x={state.x.position} y={chartTop + 20} font={fontTooltip} text={toolTipLabel} />
									</>
								)}
							</>
						)}
					</CartesianChart>
				</View>
			</YStack>
		</>
	)
}

function ChartTwo() {
	const font = useFont(inter, 12)
	const fontTooltip = useFont(inter, 18)

	const [chartTop, setChartTop] = useState(0)
	const [chartBottom, setChartBottom] = useState(0)

	const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } })
	const { state: transformState } = useChartTransformState()

	const verticalLine_p1 = useDerivedValue(() => ({ x: state.x.position.value, y: chartTop }))
	const verticalLine_p2 = useDerivedValue(() => ({ x: state.x.position.value, y: chartBottom }))

	const toolTipLabel = useDerivedValue(() => {
		return state.y.highTmp.value.value.toFixed(2)
	})

	return (
		<>
			<YStack items="center" justify="center" flex={1}>
				<View my="$10" flex={1} width="90%">
					<H3 size="$5">unrestricted pan & pinch</H3>
					<CartesianChart
						data={DATA}
						xKey="day"
						yKeys={['highTmp']}
						yAxis={[{ font: font, enableRescaling: true }]}
						xAxis={{ font: font, enableRescaling: true }}
						axisOptions={{ font }}
						chartPressState={state}
						transformConfig={{ pan: { enabled: true }, pinch: { enabled: true } }}
						transformState={transformState}
						gestureLongPressDelay={200}
						onChartBoundsChange={({ top, bottom }) => {
							setChartTop(top)
							setChartBottom(bottom)
						}}
					>
						{({ points }) => (
							<>
								<Line points={points.highTmp} color="red" strokeWidth={2} />
								{isActive && (
									<>
										<SkiaLine p1={verticalLine_p1} p2={verticalLine_p2} strokeWidth={1} />
										<ToolTip x={state.x.position} y={state.y.highTmp.position} />
										<SkiaText x={state.x.position} y={chartTop + 20} font={fontTooltip} text={toolTipLabel} />
									</>
								)}
							</>
						)}
					</CartesianChart>
				</View>
			</YStack>
		</>
	)
}

function ChartThree() {
	const font = useFont(inter, 12)
	const fontTooltip = useFont(inter, 18)

	const [chartTop, setChartTop] = useState(0)
	const [chartBottom, setChartBottom] = useState(0)

	const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0, steps: 0 } })
	const { state: transformState } = useChartTransformState()

	const verticalLine_p1 = useDerivedValue(() => ({ x: state.x.position.value, y: chartTop }))
	const verticalLine_p2 = useDerivedValue(() => ({ x: state.x.position.value, y: chartBottom }))

	const toolTipLabel = useDerivedValue(() => {
		return state.y.highTmp.value.value.toFixed(2) + ' / ' + (state.y.steps.value.value / 1000).toFixed(1) + 'k'
	})

	return (
		<>
			<YStack items="center" justify="center" flex={1}>
				<View my="$10" flex={1} width="90%">
					<H3 size="$5">dual y-axis</H3>
					<CartesianChart
						data={DATA2}
						xKey="day"
						yKeys={['highTmp', 'steps']}
						yAxis={[
							{ yKeys: ['highTmp'], font: font, enableRescaling: true },
							{ yKeys: ['steps'], font: font, enableRescaling: true, axisSide: 'right', formatYLabel: (value) => value.toFixed(0) },
						]}
						xAxis={{ font: font, enableRescaling: true }}
						axisOptions={{ font }}
						chartPressState={state}
						transformConfig={{ pan: { enabled: true }, pinch: { enabled: true } }}
						transformState={transformState}
						gestureLongPressDelay={200}
						onChartBoundsChange={({ top, bottom }) => {
							setChartTop(top)
							setChartBottom(bottom)
						}}
					>
						{({ points }) => (
							<>
								<Area points={points.steps} color="lightblue" y0={chartBottom} />
								<Line points={points.highTmp} color="black" strokeWidth={2} />
								{isActive && (
									<>
										<SkiaLine p1={verticalLine_p1} p2={verticalLine_p2} strokeWidth={1} />
										<ToolTip x={state.x.position} y={state.y.highTmp.position} color="black" />
										<ToolTip x={state.x.position} y={state.y.steps.position} color="blue" />
										<SkiaText x={state.x.position} y={chartTop + 20} font={fontTooltip} text={toolTipLabel} />
									</>
								)}
							</>
						)}
					</CartesianChart>
				</View>
			</YStack>
		</>
	)
}

export default function () {
	const { id } = useLocalSearchParams<{ id: string }>()

	return (
		<>
			<Stack.Screen options={{ title: `Datastreams ${id}` }} />
			{id === '1' && <ChartOne />}
			{id === '2' && <ChartTwo />}
			{id === '3' && <ChartThree />}
		</>
	)
}
