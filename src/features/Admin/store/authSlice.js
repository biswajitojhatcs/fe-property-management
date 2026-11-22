import { createSlice } from "@reduxjs/toolkit";

const savedAdmin = JSON.parse(localStorage.getItem("adminAuth"));

const initialState = {
  isAuthenticated: savedAdmin?.isAuthenticated || false,
  user: savedAdmin?.user || null,
  role: savedAdmin?.role || null, // e.g., "admin"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({
          isAuthenticated: true,
          user: action.payload.user,
          role: action.payload.role,
        })
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      localStorage.removeItem("adminAuth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;