import { useAuthStoreUpdateProfile, useUIStore, useForm } from '../../../hooks';
import { Modal } from '../../ui';
import { stringValuesValidation, emailValidator } from '../../../helpers';
import { useMemo } from 'react';
import { InputComponent, Message } from '../../../utilities';


const updateFormValidations = {
    nombres: [stringValuesValidation, 'El campo nombres es inválido'],
    apellidoPaterno: [stringValuesValidation, 'El campo apellido paterno es inválido'],
    apellidoMaterno: [stringValuesValidation, 'El campo apellido materno es inválido'],
    rfc: [stringValuesValidation, 'El campo rfc es inválido'],
    email: [emailValidator, 'El campo email es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección es inválido'],
    numTelefono: [stringValuesValidation, 'El campo teléfono es inválido'],
}

const handleSubmitUpdateForm = (event, startUpdatingUser, baseUrl, payload, isFormValid, setFormSubmitted) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    payload.password || delete payload.password;

    startUpdatingUser(baseUrl, payload);
}

const handleCloseModalAndResetForm = (startCloseUpdateModal, handleResetForm, setFormSubmitted) => {
    startCloseUpdateModal();

    handleResetForm();

    setFormSubmitted(false);
}

export const ProfileUpdateForm = ({ baseUrl }) => {
    const { user, isLoading, errors, errorMessage, successMessage, startUpdatingUser } = useAuthStoreUpdateProfile();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();

    const userMemoized = useMemo(() => {
        return {
            nombres: user.nombres,
            apellidoPaterno: user.apellidoPaterno,
            apellidoMaterno: user.apellidoMaterno,
            rfc: user.rfc,
            email: user.email,
            direccion: user.direccion,
            numTelefono: user.numTelefono,
            password: ''
        }
    }, [user]);

    const {
        nombres, apellidoPaterno, apellidoMaterno, rfc, email, direccion, numTelefono, password, formState,
        nombresValid, apellidoPaternoValid, apellidoMaternoValid, rfcValid, emailValid, direccionValid, numTelefonoValid, passwordValid,
        isFormValid, isFormSubmitted, setFormSubmitted, handleResetForm, handleInputChange
    } = useForm(userMemoized, updateFormValidations);

    return (
        <Modal showModal={updateModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md">
                <div className="w-full space-y-3">
                    <h3 className="text-center font-bold text-2xl">Actualizar Perfil</h3>
                    {
                        errors.hasErrors
                            ? Object.keys(errors.errors).map(error => (
                                <Message key={errors.errors[error].path} message={errors.errors[error].msg} severity='error' />
                            ))
                            : <></>
                    }
                    {
                        errorMessage && !errors.hasErrors && <div className="flex justify-center items-center"><Message message={errorMessage} severity='error' /></div>
                    }
                    {
                        successMessage && <div className="flex justify-center items-center"><Message message={successMessage} severity='success' /></div>
                    }
                    <form
                        onSubmit={event => handleSubmitUpdateForm(event, startUpdatingUser, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='nombresUpdate'
                            inputName='nombres'
                            inputType='text'
                            labelText='Nombres'
                            value={nombres}
                            severity='error'
                            hasError={!!nombresValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={nombresValid}
                            placeholder='Nombres'
                        />
                        <InputComponent
                            inputId='apellidoPaternoUpdate'
                            inputName='apellidoPaterno'
                            inputType='text'
                            labelText='Apellido paterno'
                            value={apellidoPaterno}
                            severity='error'
                            hasError={!!apellidoPaternoValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={apellidoPaternoValid}
                            placeholder='Apellido paterno'
                        />
                        <InputComponent
                            inputId='apellidoMaternoUpdate'
                            inputName='apellidoMaterno'
                            inputType='text'
                            labelText='Apellido materno'
                            value={apellidoMaterno}
                            severity='error'
                            hasError={!!apellidoMaternoValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={apellidoMaternoValid}
                            placeholder='Apellido materno'
                        />
                        <InputComponent
                            inputId='rfcUpdate'
                            inputName='rfc'
                            inputType='text'
                            labelText='Rfc'
                            value={rfc}
                            severity='error'
                            hasError={!!rfcValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={rfcValid}
                            placeholder='Rfc'
                        />
                        <InputComponent
                            inputId='emailUpdate'
                            inputName='email'
                            inputType='email'
                            labelText='Email'
                            value={email}
                            severity='error'
                            hasError={!!emailValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={emailValid}
                            placeholder='Email'
                        />
                        <InputComponent
                            inputId='direccionUpdate'
                            inputName='direccion'
                            inputType='text'
                            labelText='Dirección'
                            value={direccion}
                            severity='error'
                            hasError={!!direccionValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={direccionValid}
                            placeholder='Dirección'
                        />
                        <InputComponent
                            inputId='numTelefonoUpdate'
                            inputName='numTelefono'
                            inputType='tel'
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}'
                            patternExample='Formato: 998-452-35-54'
                            labelText='Teléfono'
                            value={numTelefono}
                            severity='error'
                            hasError={!!numTelefonoValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={numTelefonoValid}
                            placeholder='Teléfono'
                        />
                        <InputComponent
                            inputId='password'
                            inputName='password'
                            inputType='password'
                            labelText='Contraseña'
                            isOptional={true}
                            value={password}
                            severity='error'
                            hasError={!!passwordValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={passwordValid}
                            placeholder='Escriba al menos 5 caracteres alfanúmericos'
                        />
                        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full sm:w-1/3 rounded bg-indigo-600 text-white font-bold p-2  hover:bg-indigo-800 focus:bg-indigo-400`}
                            >
                                Actualizar
                            </button>
                            <button
                                type="button"
                                disabled={isLoading}
                                className={`w-full sm:w-1/3 rounded bg-red-600 text-white font-bold p-2  hover:bg-red-800 focus:bg-red-400`}
                                onClick={() => handleCloseModalAndResetForm(startCloseUpdateModal, handleResetForm, setFormSubmitted)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
