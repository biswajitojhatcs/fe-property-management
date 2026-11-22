import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import AuthRoutes from "./routes/AuthRoutes";
import Login from "./features/Auth/Login";
import SignUp from "./features/Auth/SignUp";
import EndUser from "./features/User/EndUser";
import EntryPage from "./features/Entrypage/EntryPage";

import ProtectedRoute from "./features/Admin/components/ProtectedRoute";
import AdminLogin from "./features/Admin/pages/AdminLogin";
import Dashboard from "./features/Admin/pages/Dashboard";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<EntryPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/admin/login" element={<AdminLogin />} />
				{/* Subhasmita commits start */}
				<Route path="/admin/dashboard" element={<Dashboard />}/>
				{/* <Route
				path="/admin/dashboard"
				element={
				<ProtectedRoute allowedRole="admin">
					<Dashboard />
				</ProtectedRoute>
				}
				/> */}

				{/* Fallback route */}
				{/* <Route path="*" element={<Navigate to="/admin/dashboard" replace />} /> */}
				{/* Subhasmita commits end */}

				<Route element={<AuthRoutes />}>
					<Route path="/counter" element={<Counter />} />
					<Route path="/user" element={<EndUser />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
