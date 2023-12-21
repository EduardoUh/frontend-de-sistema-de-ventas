import { createSlice } from '@reduxjs/toolkit';


export const uISlice = createSlice({
    name: 'uI',
    initialState: {
        showNavbar: true
    },
    reducers: {
        onSwitchNavbarState: (state) => {
            state.showNavbar = !state.showNavbar;
        },
    }
});

export const { onSwitchNavbarState } = uISlice.actions;