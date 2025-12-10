import { TamaguiProvider } from '@tamagui/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { config } from '../tamagui.config.ts'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TamaguiProvider config={config}>
			<App />
		</TamaguiProvider>
	</StrictMode>
)
