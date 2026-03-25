import * as API from '@/api/apiServer'
import { ChartComponent } from '@/components/ChartComponent'
import { useFocusEffect } from '@react-navigation/native'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { Stack, useLocalSearchParams } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useCallback, useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { Button, Paragraph, View, XGroup, XStack, YStack } from 'tamagui'
import useStore from '../store'

const formatWithWeekDay: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	day: '2-digit',
	month: 'short',
}
const formatDay: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: 'short',
}
const formatDayWithYear: Intl.DateTimeFormatOptions = {
	month: 'short',
	year: 'numeric',
}

function formatDate(page: number, step: string) {
	const current = new Date()
	const begin = new Date()
	let beginText = ''
	let endText = ''

	if (step === 'DAY') {
		current.setDate(current.getDate() - page)
		return current.toLocaleDateString('de-CH', formatWithWeekDay)
	}
	if (step === 'WEEK') {
		begin.setDate(begin.getDate() - page * 7 - 6)
		current.setDate(current.getDate() - page * 7)
		beginText = begin.toLocaleDateString('de-CH', formatDay)
		endText = current.toLocaleDateString('de-CH', formatDay)
		return `${beginText} - ${endText}`
	}
	if (step === 'MONTH') {
		begin.setDate(begin.getDate() - page * 28 - 27)
		current.setDate(current.getDate() - page * 28)
		beginText = begin.toLocaleDateString('de-CH', formatDay)
		endText = current.toLocaleDateString('de-CH', formatDay)
		return `${beginText} - ${endText}`
	}
	if (step === 'YEAR') {
		begin.setFullYear(begin.getFullYear() - page - 1)
		begin.setMonth(begin.getMonth() - 1)
		current.setFullYear(current.getFullYear() - page)
		beginText = begin.toLocaleDateString('de-CH', formatDayWithYear)
		endText = current.toLocaleDateString('de-CH', formatDayWithYear)
		return `${beginText} - ${endText}`
	}

	return ''
}

function isTomorrow(page: number) {
	const next = new Date()
	next.setDate(next.getDate() - page + 1)
	return next > new Date()
}

function createIndicators(id: number, data: { y: number }[]) {
	switch (id) {
		case 1:
		case 3:
			return [
				{ title: 'resting', value: Math.round(Math.min(...data.map((e) => e.y))) },
				{ title: 'high', value: Math.round(Math.max(...data.map((e) => e.y))) },
			]
		case 2:
		case 4:
			return [{ title: 'total', value: Math.max(...data.map((e) => e.y)) }]

		default:
			return []
	}
}

const stepLevelByKey: Record<string, string> = {
	DAY: '1d',
	WEEK: '7d',
	MONTH: '4w',
	YEAR: '1y',
}

export default function () {
	const { first, second = '' } = useLocalSearchParams<{ first: string; second: string }>()
	const { width, height } = useWindowDimensions()
	const isLandscape = width > height

	const firstId = Number(first ?? 0)
	const secondId = Number(second ?? 0)
	const isComparison = !!(firstId && secondId)

	const [selectedStep, setStep] = useState('DAY')
	const [page, setPage] = useState(0)

	const setDatastreams = useStore((state) => state.setDatastreams)

	useEffect(() => {
		API.getLast(page, firstId, selectedStep as any).then((data) => setDatastreams(firstId, data))
	}, [firstId, page, selectedStep])
	useEffect(() => {
		API.getLast(page, secondId, selectedStep as any).then((data) => setDatastreams(secondId, data))
	}, [secondId, page, selectedStep])

	useEffect(() => setPage(0), [selectedStep])

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

	const steps = Object.keys(stepLevelByKey)
	const performanceIndicators = createIndicators(firstId, firstData)

	return (
		<>
			<Stack.Screen options={{ title: title, headerShown: !isLandscape }} />
			{!isLandscape && (
				<XGroup mx="$4" my="$5">
					{steps.map((s) => (
						<XGroup.Item key={s}>
							<Button width="25%" mx={0} borderWidth={0} size="$3" theme={selectedStep === s ? 'accent' : null} onPress={() => setStep(s)}>
								{stepLevelByKey[s]}
							</Button>
						</XGroup.Item>
					))}
				</XGroup>
			)}
			<YStack bg="white" flex={1}>
				{!isLandscape && (
					<XStack justify="space-between" items="center">
						<Button width={50} icon={ChevronLeft} chromeless onPress={() => setPage(page + 1)} />
						<Paragraph>{formatDate(page, selectedStep)}</Paragraph>
						{isTomorrow(page) ? <View width={50} /> : <Button width={50} icon={ChevronRight} chromeless onPress={() => setPage(page - 1)} />}
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
