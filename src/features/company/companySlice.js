import { createSlice } from '@reduxjs/toolkit';

export const companySlice = createSlice({
    name: 'company',
    initialState: {
        companyName: null,
        rut: null,
        companyCode: null,
        admin: null,
    },
    reducers: {
        setCompany: (state, action) => {
            const { rut, companyName, companyCode, email, username, password } = action.payload;
            state.companyName = companyName;
            state.rut = rut;
            state.companyCode = companyCode;
            state.admin = {
                email,
                username,
                password,
            };
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
