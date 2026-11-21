import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import AuthRoutes from "./routes/AuthRoutes";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EndUser from "./pages/EndUser";
import EntryPage from "./pages/EntryPage";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<EntryPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />

				<Route element={<AuthRoutes />}>
					<Route path="/counter" element={<Counter />} />
					<Route path="/user" element={<EndUser />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
