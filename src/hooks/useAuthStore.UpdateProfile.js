import { useSelector, useDispatch } from 'react-redux';
import { onSetIsLoading, onClearIsLoading, onSetErrorMessage, clearErrorMessage, onSetErrors, onClearErrors, onSetUpdatedUserInfo, onClearSuccessMessage } from '../store/auth/authSlice';
import { api } from '../api/api';


export const useAuthStoreUpdateProfile = () => {
    const { user, isLoading, errorMessage, errors, successMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const clearMessages = () => {
        dispatch(clearErrorMessage());

        dispatch(onClearErrors());

        dispatch(onClearSuccessMessage());
    }

    const startUpdatingUser = async (url = null, payload = null) => {
        if (typeof url !== 'string' || url.trim() === '' || !payload || Object.keys(payload).length === 0) return;

        try {
            dispatch(onSetIsLoading());

            const { data } = await api.put(`${url}/${user.id}`, payload);

            dispatch(onSetUpdatedUserInfo(data));

            setTimeout(() => {
                dispatch(onClearSuccessMessage());
            }, 4000);

        } catch (error) {
            if (error.response.data.message) {
                dispatch(onSetErrorMessage(error.response.data.message));

                setTimeout(() => {
                    dispatch(clearErrorMessage());
                }, 4000);
            }
            if (error.response.data.errors) {
                dispatch(onSetErrors(error.response.data.errors));

                setTimeout(() => {
                    dispatch(onClearErrors());
                }, 4000);
            }
        }
        finally {
            dispatch(onClearIsLoading());
        }
    }

    return {
        // ?? Properties
        user,
        isLoading,
        errorMessage,
        errors,
        successMessage,
        // ?? Methods
        clearMessages,
        startUpdatingUser,
    }
}
