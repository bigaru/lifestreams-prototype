import { Stack, useLocalSearchParams } from 'expo-router'
import { H3, YStack, View, XStack } from 'tamagui'
import { CartesianChart, getTransformComponents, Line, useChartPressState, useChartTransformState } from 'victory-native'
import { Circle, useFont } from '@shopify/react-native-skia'
import { useDerivedValue, type SharedValue } from 'react-native-reanimated'
import inter from '../../assets/inter-medium.ttf'
import { Line as SkiaLine, Text as SkiaText } from '@shopify/react-native-skia'
import { useState } from 'react'

const DATA = Array.from({ length: 61 }, (_, i) => ({
	day: i,
	highTmp: 40 + 30 * Math.random(),
}))

const BASE_STROKE = 2

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
	return <Circle cx={x} cy={y} r={6} color="black" />
}

export default function () {
	const { id } = useLocalSearchParams<{ id: string }>()
	const font = useFont(inter, 12)
	const [chartTop, setChartTop] = useState(0)
	const [chartBottom, setChartBottom] = useState(0)

	const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } })
	const { state: transformState } = useChartTransformState()

	const verticalLine_p1 = useDerivedValue(() => ({ x: state.x.position.value, y: chartTop }))
	const verticalLine_p2 = useDerivedValue(() => ({ x: state.x.position.value, y: chartBottom }))

	const strokeW = useDerivedValue(() => {
		const vals = getTransformComponents(transformState.matrix.value)
		const sx = vals.scaleX ?? 1
		return BASE_STROKE / sx
	})
	const strokeWHelpLine = useDerivedValue(() => {
		const vals = getTransformComponents(transformState.matrix.value)
		const sx = vals.scaleX ?? 1
		return 1 / sx
	})

	return (
		<>
			<Stack.Screen options={{ title: `Datastreams ${id}` }} />
			<YStack items="center" justify="center" flex={1}>
				<View my="$10" flex={1} width="90%">
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
