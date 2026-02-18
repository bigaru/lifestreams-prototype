import { Stack, useLocalSearchParams } from 'expo-router'
import { H3, YStack, View, XStack } from 'tamagui'
import { CartesianChart, Line, useChartPressState, useChartTransformState } from 'victory-native'
import { Circle, useFont } from '@shopify/react-native-skia'
import type { SharedValue } from 'react-native-reanimated'
import inter from '../../assets/inter-medium.ttf'
import { Line as SkiaLine } from '@shopify/react-native-skia'

const DATA = Array.from({ length: 61 }, (_, i) => ({
	day: i,
	highTmp: 40 + 30 * Math.random(),
}))

const initialViewport: any = { x: [45, 60] }

export default function () {
	const { id } = useLocalSearchParams<{ id: string }>()
	const font = useFont(inter, 12)

	const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } })
	const { state: transformState } = useChartTransformState()

	return (
		<>
			<Stack.Screen options={{ title: `Datastreams ${id}` }} />
			<YStack items="center" justify="center" flex={1}>
				<View my="$10" flex={1} width="100%">
					<CartesianChart
						data={DATA}
						xKey="day"
						yKeys={['highTmp']}
						yAxis={[{ font: font, enableRescaling: true }]}
						xAxis={{ font: font, enableRescaling: true }}
						padding={12}
						axisOptions={{ font }}
						chartPressState={state}
						transformConfig={{ pan: { enabled: true, activateAfterLongPress: 100 }, pinch: { enabled: true } }}
						transformState={transformState}
						viewport={initialViewport}
					>
						{({ points, chartBounds }) => (
							<>
								<Line points={points.highTmp} color="red" strokeWidth={3} />
								{isActive && (
									<SkiaLine p1={{ x: state.x.position.value, y: chartBounds.top }} p2={{ x: state.x.position.value, y: chartBounds.bottom }} strokeWidth={1} />
								)}
							</>
						)}
					</CartesianChart>
				</View>
			</YStack>
		</>
	)
}
