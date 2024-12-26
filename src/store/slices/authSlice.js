import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    username : ''
}

const authSlice = createSlice({
    name :  'auth',  
    initialState, 
    reducers : {
        login(state,action) {
            state.username = action.payload
        },
        logout(state,action) {
            state.username = ''
        }
    }

})

export const {login , logout } = authSlice.actions
export default authSlice.reducer