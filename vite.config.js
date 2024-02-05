import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: { port: 3000, open: true },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/assets/_mantine";`,
			},
		},
	},
})
