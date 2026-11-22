import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockDashboardData } from "../data/mockDashboardData";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      // --- REAL API CODE (Commented out for now) ---
      // const response = await fetch("/api/admin/dashboard", {
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Authorization: `Bearer ${token}`,
      //   },
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to load dashboard data");
      // }
      // const data = await response.json();
      // return data;

      // --- MOCK DATA CODE (Active) ---
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockDashboardData;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    kpis: [],
    recentTenants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.kpis = action.payload.kpis;
        state.recentTenants = action.payload.recentTenants;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;