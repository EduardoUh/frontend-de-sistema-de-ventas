import { createSlice } from '@reduxjs/toolkit';


export const uISlice = createSlice({
    name: 'uI',
    initialState: {
        showNavbar: true,
        updateModalIsOpen: false,
        createModalIsOpen: false,
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
        onOpenCreateModal: (state) => {
            state.createModalIsOpen = true;
        },
        onCloseCreateModal: (state) => {
            state.createModalIsOpen = false;
        },
    }
});

export const { onSwitchNavbarState, onOpenUpdateModal, onCloseUpdateModal, onOpenCreateModal, onCloseCreateModal } = uISlice.actions;