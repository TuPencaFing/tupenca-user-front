import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        isLogged: false,
        company: null,
        token: null,
        user: null,
    },
    reducers: {
        setSession: (state, action) => {
            const { token } = action.payload;
            const user = jwtDecode(token);
            console.log('User token: ', user);
            state.user = {
                id: parseInt(user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']),
                name: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
                email: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            };
            state.isLogged = true;
            state.token = token;
        },
        setCompanySession: (state, action) => {
            const { token, companyCode } = action.payload;
            const user = jwtDecode(token);
            console.log('User token: ', user);
            state.user = {
                name: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
                email: user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            };
            state.isLogged = true;
            state.token = token;
            state.company = {
                code: companyCode,
            };
        },
        destroySession: (state) => {
            state.isLogged = false;
            state.company = null;
            state.token = null;
            state.user = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSession, setCompanySession, destroySession } = sessionSlice.actions;

export default sessionSlice.reducer;
