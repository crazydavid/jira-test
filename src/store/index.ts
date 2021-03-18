import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "screens/project-list/project-list.slice";
import { authSilce } from "./auth.slice";

export const rootReducer = {
    projectList: projectListSlice.reducer,
    auth:authSilce.reducer
}

export const store = configureStore({
    reducer:rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RooteState = ReturnType<typeof store.getState>