import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";

async function enableMocking() {
	if (import.meta.env.VITE_ENABLE_MSW !== "true") return;
	const { worker } = await import("./mocks/browser");
	await worker.start().catch((error) => {
		console.error("[MSW] 서비스워커 시작 실패:", error);
	});
}

enableMocking().finally(() => {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
});
