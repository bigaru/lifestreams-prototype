import { useRouter } from 'expo-router'
import { Card, Paragraph, YStack } from 'tamagui'

export default function () {
	const router = useRouter()
	const items = ['Requests', 'Ongoing', 'Declined', 'Archived']

	return (
		<>
			<YStack gap="$3" p="$3">
				{items.map((item) => (
					<Card
						key={item}
						backgroundColor={'white'}
						bordered
						padding="$4"
						py="$6"
						borderRadius="$radius.6"
						onPress={() => {
							router.push({ pathname: `/datastreams`, params: { first: item, second: '' } })
						}}
					>
						<Paragraph size="$8" fontWeight="800">
							{item}
						</Paragraph>
					</Card>
				))}
			</YStack>
		</>
	)
}
