import { configureStore } from "@reduxjs/toolkit"
import dataSlice from "./dataSlice"
import coursesSlice from "./courseSlice"

const store = configureStore({
    reducer: {data:dataSlice.reducer, courses:coursesSlice.reducer } 

})

export default store