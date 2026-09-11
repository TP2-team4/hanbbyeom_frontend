import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import { AppRouter } from "./routes/router";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
