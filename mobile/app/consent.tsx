import * as API from '@/api/apiServer'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Button, Card, H3, Paragraph, ScrollView, Sheet, XStack, YStack } from 'tamagui'
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
	const [overviews, setOverviews] = useState<{ name: string; description: string }[]>([])
	const [pos, setPos] = useState<number>()

	const { first } = useLocalSearchParams<{ first: string }>()

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
						<Paragraph size="$8" fontWeight="800">
							{pos != null ? overviews[pos].name : ''}
						</Paragraph>
						<Paragraph>{pos != null ? overviews[pos].description : ''}</Paragraph>
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
