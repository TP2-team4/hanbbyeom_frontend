import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8080",
				// target: "http://3.34.213.38:8080",	// 벡엔드에서 차단 돼서 npm run dev 시 테스트 못함
				changeOrigin: true,
			},
		},
	},
});
