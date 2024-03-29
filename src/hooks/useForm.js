import { useEffect, useMemo, useState } from 'react';


export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    useEffect(() => {
        createValidators();
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

    const isFormValid = useMemo(() => {
        for (const formValue in formValidation) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation])

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

    const handleResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckedValues = {};

        for (const formField in formValidations) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    }

    const setFormSubmitted = (value = false) => {
        setIsFormSubmitted(value);
    }

    return {
        // properties
        ...formState,
        ...formValidation,
        formState,
        isFormValid,
        isFormSubmitted,
        // methods
        handleInputChange,
        handleResetForm,
        setFormSubmitted
    }
}
