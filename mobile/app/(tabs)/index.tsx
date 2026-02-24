import * as API from '@/api/apiServer'
import { useRouter } from 'expo-router'
import { Activity, Bed, Flame, Footprints, Heart, Scale, Users, EllipsisVertical } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { Button, Card, H3, Paragraph, ScrollView, XStack, YStack } from 'tamagui'
import useStore from '../../store'

const formatOpt: Intl.DateTimeFormatOptions = {
	weekday: 'short', // Mon
	day: '2-digit', // 12
	month: 'short', // Jan
}

const iconByCategoryId: any = {
	1: <Heart size="$1" mr="$2" />,
	2: <Footprints size="$1" mr="$2" />,
	3: <Bed size="$1" mr="$2" />,
	4: <Activity size="$1" mr="$2" />,
	5: <Scale size="$1" mr="$2" />,
	6: <Flame size="$1" mr="$2" />,
	7: <Users size="$1" mr="$2" />,
}

export default function () {
	useEffect(() => {
		//API.getOverview().then(setOverviews)
	}, [])
	const router = useRouter()
	const { overviews, setOverviews } = useStore()

	return (
		<ScrollView>
			<XStack p="$3">
				<H3 size="$6" fontWeight="800">
					My Data Streams
				</H3>
			</XStack>
			<YStack gap="$3" p="$3" pt="$0">
				{overviews.map((item, _idx) => (
					<Card
						key={item.id}
						backgroundColor="white"
						bordered
						padding="$4"
						pb="$3"
						pt="$3"
						margin="$-1"
						borderRadius="$radius.6"
						onPress={() => router.push(`/datastreams/${item.id}`)}
					>
						<YStack flex={1} gap="$1">
							<XStack gap="$1" justify="space-between">
								<XStack gap="$1" items="center">
									{iconByCategoryId[item.id]}
									<Paragraph>{item.categoryDescription}</Paragraph>
								</XStack>
								<Button size="$1" chromeless>
									<EllipsisVertical size="$1" />
								</Button>
							</XStack>
							<XStack gap="$1" justify="flex-start" items="baseline">
								<Paragraph size="$8" fontWeight="800">
									{item.value}
								</Paragraph>
								<Paragraph size="$5" fontWeight="800">
									{item.unit}
								</Paragraph>
							</XStack>
							<XStack gap="$1" justify="space-between">
								<Paragraph>{item.classes.join(', ')}</Paragraph>
								<Paragraph>{new Date(item.createdAt).toLocaleDateString('de-CH', formatOpt)}</Paragraph>
							</XStack>
						</YStack>
					</Card>
				))}
			</YStack>
		</ScrollView>
	)
}
