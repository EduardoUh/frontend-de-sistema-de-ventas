import { useUIStore, useRecordsStoreUpdate, useForm } from '../../../hooks';
import { InputComponent, Message } from '../../../utilities';
import { Modal, PaginatedSelect, ModulesCheckbox } from '../../ui';
import { stringValuesValidation, emailValidator, modulesValidation, booleanValuesValidation } from '../../../helpers';


const updateFormValidations = {
    nombres: [stringValuesValidation, 'El campo nombres es inválido'],
    apellidoPaterno: [stringValuesValidation, 'El campo apellido paterno es inválido'],
    apellidoMaterno: [stringValuesValidation, 'El campo apellido materno es inválido'],
    rfc: [stringValuesValidation, 'El campo rfc es inválido'],
    rol: [stringValuesValidation, 'El campo rol es inválido'],
    email: [emailValidator, 'El campo email es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección es inválido'],
    numTelefono: [stringValuesValidation, 'El campo teléfono es inválido'],
    activo: [booleanValuesValidation, 'El campo status es inválido'],
    modulos: [modulesValidation, 'Debe seleccionar al menos un módulo'],
}

const selectOptions = [
    {
        value: "true",
        text: 'Activo'
    },
    {
        value: "false",
        text: 'Inactivo'
    }
]

const handleSubmitUpdateForm = (event, startUpdatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    payload.activo = String(payload.activo) === 'true';

    delete payload.id;

    payload.sucursal || delete payload.sucursal;

    startUpdatingRecord(url, payload, 'usuario');
}

const handleCloseModal = (startCloseUpdateModal, setFormSubmitted, handleResetForm, startCleaningRecord) => {
    startCloseUpdateModal();

    startCleaningRecord();

    handleResetForm();

    setFormSubmitted(false);
}

export const UsersUpdateForm = ({ baseUrl }) => {
    const { selectedRecord, errors, error, isLoading, sucessMessage, startCleaningRecord, startUpdatingRecord } = useRecordsStoreUpdate();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();
    const {
        nombres, apellidoPaterno, apellidoMaterno, rfc, rol, sucursal, email, direccion, numTelefono, activo, modulos, formState,
        nombresValid, apellidoPaternoValid, apellidoMaternoValid, rfcValid, rolValid, sucursalValid, emailValid, direccionValid, numTelefonoValid, activoValid, modulosValid,
        handleInputChange, handleResetForm, isFormSubmitted, isFormValid, setFormSubmitted
    } = useForm(selectedRecord, updateFormValidations);

    return (
        <Modal showModal={updateModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 h-5/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Actualizar Usuario</h3>
                {
                    errors.hasErrors
                        ? Object.keys(errors.errors).map(error => (
                            <Message key={errors.errors[error].path} message={errors.errors[error].msg} severity='error' />
                        ))
                        : <></>
                }
                {
                    error.hasError && !errors.hasErrors && <Message message={error.errorMessage} severity='error' />
                }
                {
                    sucessMessage && <Message message={sucessMessage} severity='success' />
                }
                <div className="w-full h-full overflow-auto">
                    <form
                        onSubmit={event => handleSubmitUpdateForm(event, startUpdatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
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
                        <PaginatedSelect
                            baseUrl='/sucursales'
                            inputId='sucursalUpdate'
                            inputName='sucursal'
                            labelText='Sucursal'
                            value={sucursal}
                            hasError={!!sucursalValid && isFormSubmitted}
                            severity='error'
                            errorMessage={sucursalValid}
                            handleChange={handleInputChange}
                            keyToGetSelectValue='id'
                            keyToGetSelectText='nombre'
                            keyToGetData='sucursales'
                        />
                        <PaginatedSelect
                            baseUrl='/roles'
                            inputId='rolUpdate'
                            inputName='rol'
                            labelText='Rol'
                            value={rol}
                            hasError={!!rolValid && isFormSubmitted}
                            severity='error'
                            errorMessage={rolValid}
                            handleChange={handleInputChange}
                            keyToGetSelectValue='id'
                            keyToGetSelectText='rol'
                            keyToGetData='roles'
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
                        <ModulesCheckbox
                            values={modulos}
                            handleInputChange={handleInputChange}
                            severity='error'
                            errorMessage={modulosValid}
                            hasError={!!modulosValid && isFormSubmitted}
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
