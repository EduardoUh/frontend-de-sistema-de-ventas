import { createSlice } from '@reduxjs/toolkit';


export const uISlice = createSlice({
    name: 'uI',
    initialState: {
        showNavbar: true,
        updateModalIsOpen: false,
    },
    reducers: {
        onSwitchNavbarState: (state) => {
            state.showNavbar = !state.showNavbar;
        },
        onOpenUpdateModal: (state) => {
            state.updateModalIsOpen = true;
        },
        onCloseUpdateModal: (state) => {
            state.updateModalIsOpen = false;
        },
    }
});

export const { onSwitchNavbarState, onOpenUpdateModal, onCloseUpdateModal } = uISlice.actions;