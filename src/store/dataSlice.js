import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice(
    {
        name: 'data',
        initialState: { data: [], admin: [], isAdmin: false, isLoggedIn: false },
        reducers: {
            storeData(state, action) {
                const newitem = action.payload;
                state.data = [newitem]
                // console.log('user', state.data[0]);
            },
            storeAdmin(state, action) {
                const newitem = action.payload;
                state.admin = [newitem]
                // console.log('admin', state.admin[0]);
            },
            setAdmin(state ,action) {
                state.isAdmin = action.payload;
                // console.log(state.isAdmin);
            },
            loginHandler(state) {
                state.isLoggedIn = true
            },
            logoutHandler(state) {
                state.isLoggedIn = false
            }


        }

    }
)

export const dataActions = dataSlice.actions
export default dataSlice