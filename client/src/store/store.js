import { configureStore } from "@reduxjs/toolkit";
import maSinhVienSlice from "../data/maSinhVienSlice";
import globalVariableSlice from "../data/globalVariableSlice";

const store = configureStore({
  reducer: {
    maSinhVien: maSinhVienSlice,
    globalVariable: globalVariableSlice,
  },
});

export default store;
