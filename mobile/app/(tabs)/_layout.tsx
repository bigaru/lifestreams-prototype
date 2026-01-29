import { Tabs } from 'expo-router'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { UserCircle2 } from '@tamagui/lucide-icons'

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				tabBarButton: HapticTab,
				headerLeft: () => <UserCircle2 size="$2.5" m="$4" strokeWidth={1} />,
			}}
		>
			<Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <MaterialIcons color={color} size={28} name="home" /> }} />
			<Tabs.Screen name="following" options={{ title: 'Following', tabBarIcon: ({ color }) => <MaterialIcons color={color} size={28} name="groups" /> }} />
			<Tabs.Screen
				name="reporting"
				options={{ title: 'Self-Reporting', tabBarIcon: ({ color }) => <MaterialIcons color={color} size={28} name="fact-check" /> }}
			/>
		</Tabs>
	)
}
