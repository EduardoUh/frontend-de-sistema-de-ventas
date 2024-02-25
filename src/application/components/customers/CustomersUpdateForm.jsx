import { useRecordsStoreUpdate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { InputComponent } from '../../../utilities';
import { stringValuesValidation, emailValidator, booleanValuesValidation } from '../../../helpers';


const updateFormValidations = {
    nombres: [stringValuesValidation, 'El campo nombres es inválido'],
    apellidoPaterno: [stringValuesValidation, 'El campo apellido paterno es inválido'],
    apellidoMaterno: [stringValuesValidation, 'El campo apellido materno es inválido'],
    rfc: [stringValuesValidation, 'El campo rfc es inválido'],
    email: [emailValidator, 'El campo email es inválido'],
    numTelefono: [stringValuesValidation, 'El campo teléfono es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección es inválido'],
    activo: [booleanValuesValidation, 'El campo estatus es inválido'],
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

const handleSubmitUpdateForm = (e, startUpdatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    payload.activo = String(payload.activo) === 'true';

    delete payload.id;

    startUpdatingRecord(url, payload, 'cliente');
}

const handleCloseModal = (startCloseUpdateModal, setFormSubmitted, handleResetForm, startCleaningRecord) => {
    startCloseUpdateModal();

    startCleaningRecord();

    handleResetForm();

    setFormSubmitted(false);
}

export const CustomersUpdateForm = ({ baseUrl }) => {
    const { selectedRecord, isLoading, errors, error, sucessMessage, startUpdatingRecord, startCleaningRecord } = useRecordsStoreUpdate();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();
    const {
        nombres, apellidoPaterno, apellidoMaterno, rfc, email, numTelefono, direccion, activo, formState,
        nombresValid, apellidoPaternoValid, apellidoMaternoValid, rfcValid, emailValid, numTelefonoValid, direccionValid, activoValid,
        isFormValid, isFormSubmitted, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(selectedRecord, updateFormValidations);

    return (
        <Modal showModal={updateModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 h-5/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Actualizar Cliente</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full h-full overflow-auto">
                    <form
                        onSubmit={e => handleSubmitUpdateForm(e, startUpdatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
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
                            inputId='activoUpdate'
                            inputName='activo'
                            inputType='select'
                            labelText='Estatus'
                            value={activo}
                            selectOptions={selectOptions}
                            severity='error'
                            hasError={!!activoValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={activoValid}
                        />
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
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
