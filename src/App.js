import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import AuthRoutes from "./routes/AuthRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>
              Hello World!
            </h1>
          }
        />
        <Route element={<AuthRoutes />}>
          <Route path="/counter" element={<Counter />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
