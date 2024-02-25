import { useRecordsStoreUpdate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { InputComponent } from '../../../utilities';
import { stringValuesValidation, emailValidator, booleanValuesValidation } from '../../../helpers';


const updateFormValidations = {
    nombre: [stringValuesValidation, 'El campo nombre es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección es inválido'],
    numTelefono: [stringValuesValidation, 'El campo teléfono es inválido'],
    email: [emailValidator, 'El campo email es inválido'],
    rfc: [stringValuesValidation, 'El campo rfc es inválido'],
    activo: [booleanValuesValidation, 'El campo estatus es inválido']
}

const selectOptions = [
    {
        value: 'true',
        text: 'Activo'
    },
    {
        value: 'false',
        text: 'Inactivo'
    }
]

const handleSubmitCreateForm = (e, startUpdatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    payload.activo = String(payload.activo) === 'true';

    startUpdatingRecord(url, payload, 'proveedor');
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm, startCleaningRecord) => {
    startCloseCreateModal();

    setFormSubmitted(false);

    handleResetForm();

    startCleaningRecord();
}

export const ProvidersUpdateForm = ({ baseUrl }) => {
    const { selectedRecord, errors, error, isLoading, sucessMessage, startUpdatingRecord, startCleaningRecord } = useRecordsStoreUpdate();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();
    const {
        nombre, direccion, numTelefono, email, rfc, activo, formState,
        nombreValid, direccionValid, numTelefonoValid, emailValid, rfcValid, activoValid,
        isFormSubmitted, isFormValid, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(selectedRecord, updateFormValidations);

    return (
        <Modal showModal={updateModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Actualizar Proveedor</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full space-y-3 overflow-auto">
                    <form
                        onSubmit={e => handleSubmitCreateForm(e, startUpdatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
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
                            severity='error'
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
                            severity='error'
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
                            severity='error'
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
                            severity='error'
                            placeholder='Rfc'
                        />
                        <InputComponent
                            inputId='activo'
                            inputName='activo'
                            inputType='select'
                            labelText='Estatus'
                            value={activo}
                            handleChange={handleInputChange}
                            hasError={!!activoValid && isFormSubmitted}
                            errorMessage={activoValid}
                            severity='error'
                            selectOptions={selectOptions}
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
                                onClick={() => handleCloseModal(startCloseUpdateModal, setFormSubmitted, handleResetForm, startCleaningRecord)}
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
