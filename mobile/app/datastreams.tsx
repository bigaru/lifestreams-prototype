import { ChartComponent } from '@/components/ChartComponent'
import { useFocusEffect } from '@react-navigation/native'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { Stack, useLocalSearchParams } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { Button, Paragraph, XGroup, XStack, YStack } from 'tamagui'
import useStore from '../store'

const formatOpt: Intl.DateTimeFormatOptions = {
	weekday: 'short', // Mon
	day: '2-digit', // 12
	month: 'short', // Jan
}

function createIndicators(id: number, data: { y: number }[]) {
	switch (id) {
		case 1:
		case 3:
			return [
				{ title: 'resting', value: Math.min(...data.map((e) => e.y)) },
				{ title: 'high', value: Math.max(...data.map((e) => e.y)) },
			]
		case 2:
		case 4:
			return [{ title: 'total', value: Math.max(...data.map((e) => e.y)) }]

		default:
			return []
	}
}

export default function () {
	const { first, second = '' } = useLocalSearchParams<{ first: string; second: string }>()
	const { width, height } = useWindowDimensions()
	const isLandscape = width > height

	const firstId = Number(first ?? 0)
	const secondId = Number(second ?? 0)
	const isComparison = !!(firstId && secondId)

	useFocusEffect(
		useCallback(() => {
			ScreenOrientation.unlockAsync()
			return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
		}, [])
	)

	const title = useStore((state) => {
		const firstTitle = state.overviews.find((i) => i.id === firstId)?.categoryDescription ?? ''
		const seconditle = state.overviews.find((i) => i.id === secondId)?.categoryDescription ?? ''
		return isComparison ? `${firstTitle} and ${seconditle}` : firstTitle
	})
	const firstData = useStore((state) => state.datastreamsById[firstId])
	const secondData = useStore((state) => state.datastreamsById[secondId]) ?? []

	const {
		unit: firstUnit,
		color: firstColor,
		domain: firstDomain,
	} = useStore((state) => state.overviews.find((i) => i.id === firstId)) ?? { unit: '', color: 'black', domain: [0, 100] }
	const {
		unit: secondUnit,
		color: secondColor,
		domain: secondDomain,
	} = useStore((state) => state.overviews.find((i) => i.id === secondId)) ?? { unit: '', color: 'black', domain: [0, 100] }

	const [selectedStep, setStep] = useState('1d')
	const [selectedDate, setDate] = useState(new Date())

	const steps = ['1d', '7d', '4w', '1y']
	const performanceIndicators = createIndicators(firstId, firstData)

	return (
		<>
			<Stack.Screen options={{ title: title, headerShown: !isLandscape }} />
			{!isLandscape && (
				<XGroup mx="$4" my="$5">
					{steps.map((s) => (
						<XGroup.Item key={s}>
							<Button width="25%" mx={0} borderWidth={0} size="$3" theme={selectedStep === s ? 'accent' : null} onPress={() => setStep(s)}>
								{s}
							</Button>
						</XGroup.Item>
					))}
				</XGroup>
			)}
			<YStack bg="white" flex={1}>
				{!isLandscape && (
					<XStack justify="space-between" items="center">
						<Button icon={ChevronLeft} chromeless />
						<Paragraph>{selectedDate.toLocaleDateString('de-CH', formatOpt)}</Paragraph>
						<Button icon={ChevronRight} chromeless />
					</XStack>
				)}
				{!isLandscape && !isComparison && (
					<XStack items="center" mx="$4" justify="space-around">
						{performanceIndicators.map((e) => (
							<YStack key={e.title}>
								<Paragraph mb="$-2" size="$2" fontWeight="800" textTransform="uppercase" color="$black10">
									{e.title}
								</Paragraph>
								<XStack items="baseline">
									<Paragraph size="$10">{e.value}</Paragraph>
									<Paragraph size="$4">{firstUnit}</Paragraph>
								</XStack>
							</YStack>
						))}
					</XStack>
				)}
				<ChartComponent
					my={isLandscape ? '$6' : null}
					px={isLandscape ? '$6' : null}
					mt={!isLandscape ? 0 : null}
					mb={!isLandscape ? '$10' : null}
					width={'90%'}
					isComparison={isComparison}
					unit={[firstUnit, secondUnit]}
					color={[firstColor, secondColor]}
					data={[firstData, secondData]}
					domain={[firstDomain, secondDomain] as any}
				/>
			</YStack>
		</>
	)
}
