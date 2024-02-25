import { useSelector, useDispatch } from 'react-redux';
import { onSwitchNavbarState, onOpenUpdateModal, onCloseUpdateModal, onOpenCreateModal, onCloseCreateModal, onOpenShowMoreModal, onCloseShowMoreModal } from '../store/ui/uISlice';


export const useUIStore = () => {
    const { showNavbar, updateModalIsOpen, createModalIsOpen, showMoreModalIsOpen } = useSelector(state => state.uI);
    const dispatch = useDispatch();

    const startSwitchNavbarState = () => {
        dispatch(onSwitchNavbarState());
    }

    const startOpenUpdateModal = () => {
        dispatch(onOpenUpdateModal());
    }

    const startCloseUpdateModal = () => {
        dispatch(onCloseUpdateModal());
    }

    const startOpenCreateModal = () => {
        dispatch(onOpenCreateModal());
    }

    const startCloseCreateModal = () => {
        dispatch(onCloseCreateModal());
    }

    const startOpenShowMoreModal = () => {
        dispatch(onOpenShowMoreModal());
    }

    const startCloseShowMoreModal = () => {
        dispatch(onCloseShowMoreModal());
    }

    return {
        // ? properties
        showNavbar,
        updateModalIsOpen,
        createModalIsOpen,
        showMoreModalIsOpen,
        // ? methods
        startSwitchNavbarState,
        startOpenUpdateModal,
        startCloseUpdateModal,
        startOpenCreateModal,
        startCloseCreateModal,
        startOpenShowMoreModal,
        startCloseShowMoreModal,
    }
}
