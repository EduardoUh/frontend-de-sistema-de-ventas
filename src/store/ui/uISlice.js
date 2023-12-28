import { createSlice } from '@reduxjs/toolkit';


export const uISlice = createSlice({
    name: 'uI',
    initialState: {
        showNavbar: true,
        modalIsOpen: false,
    },
    reducers: {
        onSwitchNavbarState: (state) => {
            state.showNavbar = !state.showNavbar;
        },
        onOpenModal: (state) => {
            state.modalIsOpen = true;
        },
        onCloseModal: (state) => {
            state.modalIsOpen = false;
        },
    }
});

export const { onSwitchNavbarState, onOpenModal, onCloseModal } = uISlice.actions;