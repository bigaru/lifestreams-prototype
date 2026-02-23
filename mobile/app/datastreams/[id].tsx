import { useFocusEffect } from '@react-navigation/native'
import { Circle, Line as SkiaLine, Text as SkiaText, useFont } from '@shopify/react-native-skia'
import { Stack, useLocalSearchParams } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useDerivedValue } from 'react-native-reanimated'
import { GetThemeValueForKey, View, YStack } from 'tamagui'
import { CartesianChart, Line, useChartPressState, useChartTransformState } from 'victory-native'
import inter from '../../assets/inter-medium.ttf'
import hrData from '../../data/hr.json'

interface ChartProps {
	my: number | GetThemeValueForKey<'marginVertical'>
	width: number | GetThemeValueForKey<'width'>
	color: string
}

function ChartComponent(props: ChartProps) {
	const { my, color, width } = props
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
				<View my={my} flex={1} width={width}>
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
								<Line points={points.y} color={color} strokeWidth={2} />
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
	const { width, height } = useWindowDimensions()
	const isLandscape = width > height

	useFocusEffect(
		useCallback(() => {
			ScreenOrientation.unlockAsync()
			return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
		}, [])
	)

	return (
		<>
			<Stack.Screen options={{ title: `Datastreams ${id}`, headerShown: !isLandscape }} />
			<ChartComponent my={isLandscape ? '$5' : '$10'} width={isLandscape ? '80%' : '90%'} color="red" />
		</>
	)
}
