import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tamaguiPlugin({
			// points to your tamagui config file
			config: './tamagui.config.ts',
			// points to any linked packages or node_modules
			// that have tamagui components to optimize
			components: ['tamagui'],
			// turns on the optimizing compiler
			optimize: true,
		}),
	],
	resolve: {
		dedupe: ['react', 'react-dom'],
		alias: {
			'@lifestreams/shared': path.resolve(__dirname, '../shared/src'),
		},
	},
})
