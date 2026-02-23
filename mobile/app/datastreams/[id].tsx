import { Stack, useLocalSearchParams } from 'expo-router'
import { H3, YStack, View, XStack } from 'tamagui'
import { Area, CartesianChart, CartesianChartRef, getTransformComponents, Line, useChartPressState, useChartTransformState } from 'victory-native'
import { Circle, useFont } from '@shopify/react-native-skia'
import { useDerivedValue, type SharedValue } from 'react-native-reanimated'
import inter from '../../assets/inter-medium.ttf'
import { Line as SkiaLine, Text as SkiaText } from '@shopify/react-native-skia'
import { useRef, useState } from 'react'
import hrData from '../../data/hr.json'

function ChartComponent() {
	const font = useFont(inter, 12)
	const fontTooltip = useFont(inter, 18)

	const [chartTop, setChartTop] = useState(0)
	const [chartBottom, setChartBottom] = useState(0)

	const { state, isActive } = useChartPressState({ x: 0, y: { y: 0 } })
	const { state: transformState } = useChartTransformState()

	const verticalLine_p1 = useDerivedValue(() => ({ x: state.x.position.value, y: chartTop }))
	const verticalLine_p2 = useDerivedValue(() => ({ x: state.x.position.value, y: chartBottom }))

	const toolTipLabel = useDerivedValue(() => state.y.y.value.value.toFixed(2))
	const realingedX = useDerivedValue(() => state.x.position.value - 25)

	return (
		<>
			<YStack items="center" justify="center" flex={1}>
				<View my="$10" flex={1} width="90%">
					<CartesianChart
						data={hrData}
						domain={{ y: [20, 220] }}
						padding={{ top: 30 }}
						xKey={'x'}
						yKeys={['y']}
						yAxis={[{ font: font }]}
						xAxis={{
							font: font,
							formatXLabel: (l) => String(new Date(l).getHours()).padStart(2, '0'),
							tickCount: 8,
						}}
						chartPressState={state}
						transformConfig={{ pan: { enabled: false, dimensions: ['x'] }, pinch: { enabled: false, dimensions: ['x'] } }}
						transformState={transformState}
						onChartBoundsChange={({ top, bottom }) => {
							setChartTop(top)
							setChartBottom(bottom)
						}}
						renderOutside={() => <>{isActive && <SkiaText x={realingedX} y={chartTop - 10} font={fontTooltip} text={toolTipLabel} />}</>}
					>
						{({ points }) => (
							<>
								<Line points={points.y} color="red" strokeWidth={2} />
								{isActive && (
									<>
										<SkiaLine p1={verticalLine_p1} p2={verticalLine_p2} strokeWidth={1} />
										<Circle cx={state.x.position} cy={state.y.y.position} r={6} color={'black'} />
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

			<ChartComponent />
		</>
	)
}
