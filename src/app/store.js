import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import copReducer from "./copSlice";
import sdvReducer from "./sdvSlice";
import mapReducer from "./mapSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    cop: copReducer,
    sdv: sdvReducer,
    map: mapReducer,
  },
});
