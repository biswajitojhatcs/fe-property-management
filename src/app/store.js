import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/Auth/authSlice";
import dashboardReducer from "../features/Admin/store/dashboardSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});
