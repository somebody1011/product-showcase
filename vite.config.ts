import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // <--- Add this import line

export default defineConfig({
	vite: {
		plugins: [
			nitro({
				preset: "vercel", // <--- This forces Nitro to output a Vercel-compatible server bundle
			}),
		],
		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:4000',
					changeOrigin: true,
					secure: false,
				},
			},
		},
	},
});
