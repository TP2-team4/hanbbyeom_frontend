import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";

async function enableMocking() {
	if (import.meta.env.PROD) return;
	const { worker } = await import("./mocks/brower");
	return worker.start();
}

enableMocking().then(() => {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
});
