import { createSlice } from "@reduxjs/toolkit";

export const maSinhVienSlice = createSlice({
  name: "maSinhVien",
  initialState: {
    result: "",
  },
  reducers: {
    changeMaSinhVien: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { changeMaSinhVien } = maSinhVienSlice.actions;

export const selectMaSinhVien = (state) => state.maSinhVienSlice.maSinhVien;

export default maSinhVienSlice.reducer;
