import { useSelector, useDispatch } from 'react-redux';
import { onSwitchNavbarState, onOpenUpdateModal, onCloseUpdateModal, onOpenCreateModal, onCloseCreateModal } from '../store/ui/uISlice';


export const useUIStore = () => {
    const { showNavbar, updateModalIsOpen, createModalIsOpen } = useSelector(state => state.uI);
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

    return {
        // ? properties
        showNavbar,
        updateModalIsOpen,
        createModalIsOpen,
        // ? methods
        startSwitchNavbarState,
        startOpenUpdateModal,
        startCloseUpdateModal,
        startOpenCreateModal,
        startCloseCreateModal,
    }
}
