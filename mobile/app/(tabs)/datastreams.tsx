import Entypo from '@expo/vector-icons/Entypo'
import { Activity, Bed, Flame, Footprints, Heart, Scale, Users } from '@tamagui/lucide-icons'
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
	year: 'numeric', // 2022
}

const data = [
	{ id: '1', title: 'Heart Rate', categories: ['Health', 'Heart'], last: dateInPast(30), icon: <Heart size="$2" mr="$2" /> },
	{ id: '2', title: 'Step Count', categories: ['Health', 'Movement'], last: dateInPast(), icon: <Footprints size="$2" mr="$2" /> },
	{ id: '3', title: 'Sleep', categories: ['Health', 'Sleep'], last: dateInPast(2), icon: <Bed size="$2" mr="$2" /> },
	{ id: '4', title: 'ECG', categories: ['Health', 'Heart'], last: dateInPast(5), icon: <Activity size="$2" mr="$2" /> },
	{ id: '5', title: 'Calories Burned', categories: ['Health'], last: dateInPast(60), icon: <Flame size="$2" mr="$2" /> },
	{ id: '6', title: 'Body Weight', categories: ['Health'], last: dateInPast(180), icon: <Scale size="$2" mr="$2" /> },
	{ id: '7', title: 'Social Activity', categories: ['Social'], last: dateInPast(14), icon: <Users size="$2" mr="$2" /> },
]

export default function () {
	return (
		<ScrollView>
			<XStack p="$3" pt="$7">
				<H3>My Data Streams</H3>
			</XStack>
			<YStack gap="$3" p="$3" pt="$0">
				{data.map((item, idx) => (
					<Card key={item.id} backgroundColor="white" bordered padding="$4" pb="$3" pt="$3" margin="$-1" borderRadius="$radius.2">
						<YStack flex={1} gap="$3">
							<XStack gap="$1" justify="space-between">
								<XStack gap="$1" alignItems="center">
									{item.icon}
									<Heading size="$5" color="$black1">
										{item.title}
									</Heading>
								</XStack>
								<Button size="$1" chromeless>
									<Entypo name="dots-three-vertical" size={18} color="black" />
								</Button>
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

/*

*/
