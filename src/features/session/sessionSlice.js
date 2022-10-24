import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        isLogged: false,
        token: null,
        user: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload != null) {
                const user = jwtDecode(action.payload);
                console.log('User token: ', user);
                state.user = {
                    name: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
                    email: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                };
                state.isLogged = true;
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setToken } = sessionSlice.actions;

export default sessionSlice.reducer;
