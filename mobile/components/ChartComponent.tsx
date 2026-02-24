import { Circle, Line as SkiaLine, Text as SkiaText, useFont } from '@shopify/react-native-skia'
import { useState } from 'react'
import { useDerivedValue } from 'react-native-reanimated'
import { View, YStack, type ViewProps } from 'tamagui'
import { CartesianChart, Line, useChartPressState, useChartTransformState } from 'victory-native'
import inter from '../assets/inter-medium.ttf'

interface ChartProps extends ViewProps {
	color: string
	firstData: { x: number; y: number }[]
	secondData?: { x: number; y: number }[]
}

export function ChartComponent(props: ChartProps) {
	const { color, firstData, secondData = [], ...ViewProps } = props
	const font = useFont(inter, 12)
	const fontTooltip = useFont(inter, 18)

	const [chartTop, setChartTop] = useState(0)
	const [chartBottom, setChartBottom] = useState(0)

	const { state, isActive } = useChartPressState({ x: 0, y: { y: 0 } })
	const { state: transformState } = useChartTransformState()

	const verticalLine_p1 = useDerivedValue(() => ({ x: state.x.position.value, y: chartTop }))
	const verticalLine_p2 = useDerivedValue(() => ({ x: state.x.position.value, y: chartBottom }))

	const toolTipLabel = useDerivedValue(() => '' + state.y.y.value.value)
	const realingedX = useDerivedValue(() => state.x.position.value - 12)

	return (
		<>
			<YStack items="center" justify="center" flex={1}>
				<View flex={1} {...ViewProps}>
					<CartesianChart
						data={firstData}
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
						renderOutside={() => (
							<>
								<SkiaText x={0} y={chartTop} font={font} text={'bpm'} />
								{isActive && <SkiaText x={realingedX} y={chartTop - 10} font={fontTooltip} text={toolTipLabel} />}
							</>
						)}
					>
						{({ points }) => (
							<>
								<Line points={points.y} color={color} strokeWidth={1} />
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
