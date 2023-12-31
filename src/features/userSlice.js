import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";
import { current } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: null, 
    reducers: {
        addNotifications: (state, { payload }) => {
            // console.log('STANJE je ',current(state))
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload];
        },
    },

    extraReducers: (builder) => {
        // save user after signup
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => {
            payload.uReduseru = 'Nesto novo'
            return payload
        });
        // builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);
        // save user after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            payload.uReduseru = 'Nesto novo - login'
            return payload
        });
        // logout: destroy user session
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
