import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import { AppRouter } from "./routes/router";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="h-dvh bg-secondary-50">
					<div className="mx-auto h-full w-full overflow-y-auto bg-secondary-50">
						<AppRouter />
					</div>
				</div>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
