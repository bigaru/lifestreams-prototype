import { TamaguiProvider, Theme } from '@tamagui/core'
import { Folder, HelpCircle, Info, Search, Settings, UserCircle2 } from '@tamagui/lucide-icons'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router'
import { Heading, ListItem, XGroup, XStack, YGroup, YStack } from 'tamagui'
import { config } from '../tamagui.config.ts'
import DataTypes from './DataTypes.tsx'

const menuItems = [
	{ path: '/data-types', title: 'Discover Data Types', icon: Search },
	{ path: '/', title: 'Projects', icon: Folder },
	{ path: '/', title: 'Documentation', icon: Info },
]
const bottomMenuItems = [{ path: '/', title: 'Help', icon: HelpCircle }]

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TamaguiProvider config={config}>
			<BrowserRouter>
				<Shell />
			</BrowserRouter>
		</TamaguiProvider>
	</StrictMode>
)

function Shell() {
	const { pathname } = useLocation()

	return (
		<Theme name={'light'}>
			<XStack flex={1} items={'center'} width={'100%'} bg="$background" height="100vh">
				<YStack p="$2" pb="$3" borderRightWidth="$0.25" borderColor="#dddddd" height="100vh">
					<Heading size="$5" fontWeight="500" pt="$1" px="$4" pb="$6">
						LIFEstreams
					</Heading>
					<YGroup flex={1}>
						{menuItems.map((m) => (
							<YGroup.Item key={m.title}>
								<Link to={m.path} style={{ textDecoration: 'none' }}>
									<ListItem
										bg={pathname !== '/' && pathname === m.path ? '$blue5' : 'transparent'}
										style={{ borderRadius: 5 }}
										icon={m.icon}
										minH={0}
										py="$1.5"
										hoverStyle={{ background: '#eee' }}
									>
										{m.title}
									</ListItem>
								</Link>
							</YGroup.Item>
						))}
					</YGroup>
					<YGroup>
						{bottomMenuItems.map((m) => (
							<YGroup.Item key={m.title}>
								<ListItem bg={'transparent'} style={{ borderRadius: 5 }} icon={m.icon} minH={0} py="$1.5" hoverStyle={{ background: '#eee' }}>
									{m.title}
								</ListItem>
							</YGroup.Item>
						))}
					</YGroup>
				</YStack>
				<YStack flex={1} height="100%">
					<XGroup style={{ borderRadius: 0 }} borderBottomWidth="$0.25" borderColor="#dddddd" justify="flex-end">
						<XGroup.Item>
							<Settings size="$2" mx="$2" my="$2" strokeWidth={1} />
						</XGroup.Item>
						<XGroup.Item>
							<UserCircle2 size="$2" mx="$2" my="$2" mr="$4" strokeWidth={1} />
						</XGroup.Item>
					</XGroup>

					<Routes>
						<Route index element={<></>} />
						<Route path="/data-types" element={<DataTypes />} />
					</Routes>
				</YStack>
			</XStack>
		</Theme>
	)
}
