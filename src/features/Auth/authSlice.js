import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: sessionStorage.getItem("isLoggedIn") === "true",
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload;
            state.error = null;
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("user", JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("user");
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;