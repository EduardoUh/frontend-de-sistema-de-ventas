import { createSlice } from '@reduxjs/toolkit';


export const uISlice = createSlice({
    name: 'uI',
    initialState: {
        showNavbar: false,
        updateModalIsOpen: false,
        createModalIsOpen: false,
        showMoreModalIsOpen: false,
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
        onOpenShowMoreModal: (state) => {
            state.showMoreModalIsOpen = true;
        },
        onCloseShowMoreModal: (state) => {
            state.showMoreModalIsOpen = false;
        }
    }
});

export const { onSwitchNavbarState, onOpenUpdateModal, onCloseUpdateModal, onOpenCreateModal, onCloseCreateModal, onOpenShowMoreModal, onCloseShowMoreModal } = uISlice.actions;