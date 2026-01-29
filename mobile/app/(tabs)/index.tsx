import Entypo from '@expo/vector-icons/Entypo'
import { Activity, Bed, Flame, Footprints, Heart, Scale, Users, EllipsisVertical } from '@tamagui/lucide-icons'
import { Button, Card, H3, Heading, Paragraph, ScrollView, XStack, YStack } from 'tamagui'

function dateInPast(removeDays: number = 0) {
	const d = new Date()
	d.setDate(d.getDate() - removeDays)
	return d.toISOString()
}

const formatOpt: Intl.DateTimeFormatOptions = {
	weekday: 'short', // Mon
	day: '2-digit', // 12
	month: 'short', // Jan
}

const data = [
	{ id: '1', val: '65', unit: 'bpm', title: 'Heart Rate', categories: ['Health', 'Heart'], last: dateInPast(30), icon: <Heart size="$1" mr="$2" /> },
	{ id: '2', val: "6'103", unit: '', title: 'Step Count', categories: ['Health', 'Movement'], last: dateInPast(), icon: <Footprints size="$1" mr="$2" /> },
	{ id: '3', val: '6', unit: 'h', title: 'Sleep', categories: ['Health', 'Sleep'], last: dateInPast(2), icon: <Bed size="$1" mr="$2" /> },
	{ id: '4', val: '65', unit: 'bpm', title: 'ECG', categories: ['Health', 'Heart'], last: dateInPast(5), icon: <Activity size="$1" mr="$2" /> },
	{ id: '5', val: "2'251", unit: 'kcal', title: 'Calories Burned', categories: ['Health'], last: dateInPast(60), icon: <Flame size="$1" mr="$2" /> },
	{ id: '6', val: '80', unit: 'kg', title: 'Body Weight', categories: ['Health'], last: dateInPast(180), icon: <Scale size="$1" mr="$2" /> },
	{ id: '7', val: '2.4', unit: 'h', title: 'Social Activity', categories: ['Social'], last: dateInPast(14), icon: <Users size="$1" mr="$2" /> },
]

export default function () {
	return (
		<ScrollView>
			<XStack p="$3" pt="$7">
				<H3 size="$6" fontWeight="800">
					My Data Streams
				</H3>
			</XStack>
			<YStack gap="$3" p="$3" pt="$0">
				{data.map((item, idx) => (
					<Card key={idx} backgroundColor="white" bordered padding="$4" pb="$3" pt="$3" margin="$-1" borderRadius="$radius.6">
						<YStack flex={1} gap="$1">
							<XStack gap="$1" justify="space-between">
								<XStack gap="$1" items="center">
									{item.icon}
									<Paragraph>{item.title}</Paragraph>
								</XStack>
								<Button size="$1" chromeless>
									<EllipsisVertical size="$1" />
								</Button>
							</XStack>
							<XStack gap="$1" justify="flex-start" items="baseline">
								<Paragraph size="$8" fontWeight="800">
									{item.val}
								</Paragraph>
								<Paragraph size="$5" fontWeight="800">
									{item.unit}
								</Paragraph>
							</XStack>
							<XStack gap="$1" justify="space-between">
								<Paragraph>{item.categories.join(', ')}</Paragraph>
								<Paragraph>{new Date(item.last).toLocaleDateString('de-CH', formatOpt)}</Paragraph>
							</XStack>
						</YStack>
					</Card>
				))}
			</YStack>
		</ScrollView>
	)
}
