import { createSlice } from "@reduxjs/toolkit";
import { AuthForm, bootstrapUser } from "context/auth-context";
import { User } from "screens/project-list/search-panel";
import { AppDispatch, RooteState } from "store";
import * as auth from 'auth-provider'

interface State{
    user:User|null
}

const initialState: State = {
    user:null
}

export const authSilce = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        }
    }
})

const { setUser } = authSilce.actions

export const selectUser = (state: RooteState) => state.auth.user
export const login = (form: AuthForm) => (dispatch: AppDispatch) => auth.login(form).then((user) => dispatch(setUser(user)))
export const register = (form: AuthForm) => (dispatch: AppDispatch) => auth.register(form).then((user) => dispatch(setUser(user)))
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)))
export const bootstrap = ()=>(dispatch:AppDispatch)=>bootstrapUser().then((user)=>dispatch(setUser(user)))