import { configureStore } from "@reduxjs/toolkit";

import roleReducer from '../../slices/roleSlice';


export const store = configureStore({
    reducer: {
        role: roleReducer       
    }
});
