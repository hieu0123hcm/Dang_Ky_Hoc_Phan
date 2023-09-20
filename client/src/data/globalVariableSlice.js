import { createSlice } from "@reduxjs/toolkit";

export const globalVariableSlice = createSlice({
  name: "globalVariable",
  initialState: {
    refresh: true,
  },
  reducers: {
    changeVariable: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { changeVariable } = globalVariableSlice.actions;

export const selectGlobalVariable = (state) =>
  state.globalVariableSlice.globalVariable;

export default globalVariableSlice.reducer;
