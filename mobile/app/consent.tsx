import * as API from '@/api/apiServer'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Card, H3, Paragraph, ScrollView, Sheet, XStack, YStack, Text } from 'tamagui'
import { Stack, useLocalSearchParams } from 'expo-router'

function trimDescription(text: string) {
	const cardLength = 50

	if (text.length <= cardLength) {
		return text
	}
	return text.slice(0, cardLength) + ' ...'
}

export default function () {
	useEffect(() => {
		API.getRequests().then(setOverviews)
	}, [])
	const router = useRouter()
	const [overviews, setOverviews] = useState<{ name: string; description: string; dataTypes: string[] }[]>([])
	const [pos, setPos] = useState<number>()

	const { first } = useLocalSearchParams<{ first: string }>()

	if (first !== 'Requests') {
		return (
			<>
				<Stack.Screen options={{ title: first }} />
				<YStack items="center" justify="center" flex={1}>
					<H3 size="$6" fontWeight="800">
						Under construction
					</H3>
				</YStack>
			</>
		)
	}

	return (
		<>
			<Stack.Screen options={{ title: first }} />
			<ScrollView>
				<YStack gap="$3" p="$3">
					{overviews.map((item, idx) => (
						<Card key={idx} backgroundColor={'white'} bordered padding="$4" pb="$3" pt="$3" margin="$-1" borderRadius="$radius.6" onPress={() => setPos(idx)}>
							<YStack flex={1} gap="$1">
								<XStack gap="$1" justify="flex-start" items="baseline">
									<Paragraph size="$8" fontWeight="800">
										{item.name}
									</Paragraph>
								</XStack>
								<XStack gap="$1" justify="space-between">
									<Paragraph>{trimDescription(item.description)}</Paragraph>
								</XStack>
								<XStack gap="$1">
									<Paragraph>{item.dataTypes.join(', ')}</Paragraph>
								</XStack>
							</YStack>
						</Card>
					))}
				</YStack>
			</ScrollView>
			<Sheet
				open={pos != null}
				onOpenChange={(open: boolean) => {
					if (!open) {
						setPos(undefined)
					}
				}}
			>
				<Sheet.Overlay transition="lazy" bg="$shadow6" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
				<Sheet.Handle />
				<Sheet.Frame>
					<YStack gap="$3" p="$5">
						{pos != null ? (
							<>
								<Paragraph size="$8" fontWeight="800">
									{overviews[pos!].name}
								</Paragraph>
								<Paragraph>{overviews[pos!].description}</Paragraph>

								<XStack gap="$2" flexWrap="wrap">
									<Paragraph>The project requires:</Paragraph>
									{overviews[pos!].dataTypes.map((d) => (
										<LabelChip key={d} label={d} />
									))}
								</XStack>
							</>
						) : null}

						<Button size="$5" theme="blue">
							I consent
						</Button>
						<Button size="$5" variant="outlined">
							Do not consent
						</Button>
						<Button size="$5" variant="outlined">
							Ask a question
						</Button>
					</YStack>
				</Sheet.Frame>
			</Sheet>
		</>
	)
}

function LabelChip({ label }: { label: string }) {
	return (
		<XStack
			items="center"
			borderTopRightRadius="$10"
			borderTopLeftRadius="$10"
			borderBottomRightRadius="$10"
			borderBottomLeftRadius="$10"
			px="$3"
			py="$1"
			background="$backgroundPress"
			borderWidth={1}
			borderColor="$borderColor"
		>
			<Text fontSize="$2">{label}</Text>
		</XStack>
	)
}
