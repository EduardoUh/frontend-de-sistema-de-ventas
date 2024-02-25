import { useRecordsStoreCreate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { InputComponent } from '../../../utilities';
import { stringValuesValidation, emailValidator } from '../../../helpers';


const createForm = {
    nombre: '',
    direccion: '',
    numTelefono: '',
    email: '',
    rfc: '',
}

const createFormValidations = {
    nombre: [stringValuesValidation, 'El campo nombre es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección es inválido'],
    numTelefono: [stringValuesValidation, 'El campo teléfono es inválido'],
    email: [emailValidator, 'El campo email es inválido'],
    rfc: [stringValuesValidation, 'El campo rfc es inválido'],
}

const handleSubmitCreateForm = (e, startCreatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    startCreatingRecord(url, payload, 'proveedor');
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm) => {
    startCloseCreateModal();

    setFormSubmitted(false);

    handleResetForm();
}

export const ProvidersCreateForm = ({ baseUrl }) => {
    const { errors, error, isLoading, sucessMessage, startCreatingRecord } = useRecordsStoreCreate();
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();
    const {
        nombre, direccion, numTelefono, email, rfc, formState,
        nombreValid, direccionValid, numTelefonoValid, emailValid, rfcValid,
        isFormSubmitted, isFormValid, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(createForm, createFormValidations);

    return (
        <Modal showModal={createModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Crear Proveedor</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full space-y-3 overflow-auto">
                    <form
                        onSubmit={e => handleSubmitCreateForm(e, startCreatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='nombre'
                            inputName='nombre'
                            inputType='text'
                            labelText='Nombre'
                            value={nombre}
                            handleChange={handleInputChange}
                            hasError={!!nombreValid && isFormSubmitted}
                            errorMessage={nombreValid}
                            severity='error'
                            placeholder='Nombre'
                        />
                        <InputComponent
                            inputId='direccion'
                            inputName='direccion'
                            inputType='text'
                            labelText='Dirección'
                            value={direccion}
                            handleChange={handleInputChange}
                            hasError={!!direccionValid && isFormSubmitted}
                            errorMessage={direccionValid}
                            placeholder='Dirección'
                        />
                        <InputComponent
                            inputId='numTelefono'
                            inputName='numTelefono'
                            inputType='tel'
                            labelText='Teléfono'
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}'
                            patternExample='997-465-78-69'
                            value={numTelefono}
                            handleChange={handleInputChange}
                            hasError={!!numTelefonoValid && isFormSubmitted}
                            errorMessage={numTelefonoValid}
                            placeholder='Teléfono'
                        />
                        <InputComponent
                            inputId='email'
                            inputName='email'
                            inputType='email'
                            labelText='Email'
                            value={email}
                            handleChange={handleInputChange}
                            hasError={!!emailValid && isFormSubmitted}
                            errorMessage={emailValid}
                            placeholder='Email'
                        />
                        <InputComponent
                            inputId='rfc'
                            inputName='rfc'
                            inputType='text'
                            labelText='Rfc'
                            value={rfc}
                            handleChange={handleInputChange}
                            hasError={!!rfcValid && isFormSubmitted}
                            errorMessage={rfcValid}
                            placeholder='Rfc'
                        />
                        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full sm:w-1/3 rounded bg-indigo-600 text-white font-bold p-2  hover:bg-indigo-800 focus:bg-indigo-400`}
                            >
                                Crear
                            </button>
                            <button
                                type="button"
                                disabled={isLoading}
                                className={`w-full sm:w-1/3 rounded bg-red-600 text-white font-bold p-2  hover:bg-red-800 focus:bg-red-400`}
                                onClick={() => handleCloseModal(startCloseCreateModal, setFormSubmitted, handleResetForm)}
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
