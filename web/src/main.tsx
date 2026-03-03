import { TamaguiProvider, Theme } from '@tamagui/core'
import { ChartPie, Search, Settings, UserCircle2 } from '@tamagui/lucide-icons'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Button, Heading, SizableText, XStack, YStack } from 'tamagui'
import { config } from '../tamagui.config.ts'
import App from './App.tsx'

const menuItems = [
	{ title: 'Data Discovery', icon: <Search size="$1" strokeWidth={1} /> },
	{ title: 'Data Availability', icon: <ChartPie size="$1" strokeWidth={1} /> },
]

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TamaguiProvider config={config}>
			<Theme name={'light'}>
				<XStack flex={1} items={'center'} width={'100%'} bg="$background" height="100vh">
					<YStack p="$2" borderRightWidth="$0.25" borderColor="#dddddd" height="100%">
						<Heading size="$6" fontWeight="600" p="$5">
							LIFEstreams
						</Heading>
						{menuItems.map((m) => (
							<Button chromeless justify={'flex-start'} width="100%" px="$4" borderWidth={0} py={0}>
								<Button.Icon>{m.icon}</Button.Icon>
								<Button.Text>
									<SizableText size="$4" fontWeight="600" color="$black8">
										{m.title}
									</SizableText>
								</Button.Text>
							</Button>
						))}
					</YStack>
					<YStack flex={1} height="100%">
						<XStack borderBottomWidth="$0.25" borderColor="#dddddd" justify="flex-end">
							<Settings size="$2" mx="$2.5" my="$2.5" strokeWidth={1} />
							<UserCircle2 size="$2" mx="$2.5" my="$2.5" mr="$4" strokeWidth={1} />
						</XStack>
						<BrowserRouter>
							<Routes>
								<Route index element={<App />} />
								<Route path="about" element={<div>Fuguuuu</div>} />
							</Routes>
						</BrowserRouter>
					</YStack>
				</XStack>
			</Theme>
		</TamaguiProvider>
	</StrictMode>
)
