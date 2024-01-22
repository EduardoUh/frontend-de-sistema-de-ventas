import { useUIStore, useRecordsStoreCreate, useForm } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { Modal, PaginatedSelect, ModulesCheckbox, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { stringValuesValidation, emailValidator, passwordValidation, modulesValidation } from '../../../helpers';


const createForm = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rfc: '',
    rol: '',
    sucursal: '',
    email: '',
    password: '',
    direccion: '',
    numTelefono: '',
    modulos: [],
}

const createFormValidations = {
    nombres: [stringValuesValidation, 'El campo nombres es inválido'],
    apellidoPaterno: [stringValuesValidation, 'El campo apellido paterno es inválido'],
    apellidoMaterno: [stringValuesValidation, 'El campo apellido materno es inválido'],
    rfc: [stringValuesValidation, 'El campo rfc es inválido'],
    rol: [stringValuesValidation, 'El campo rol es inválido'],
    email: [emailValidator, 'El campo email es inválido'],
    password: [passwordValidation, 'El campo contraseña es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección es inválido'],
    numTelefono: [stringValuesValidation, 'El campo teléfono es inválido'],
    modulos: [modulesValidation, 'Debe seleccionar al menos un módulo'],
}

const handleSubmitCreateForm = (event, startCreatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    payload.sucursal || delete payload.sucursal;

    startCreatingRecord(url, payload, 'usuario');
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm) => {
    startCloseCreateModal();

    setFormSubmitted(false);

    handleResetForm();
}

export const UsersCreateForm = ({ baseUrl }) => {
    const { errors, error, isLoading, sucessMessage, startCreatingRecord } = useRecordsStoreCreate();
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();
    const {
        nombres, apellidoPaterno, apellidoMaterno, rfc, rol, sucursal, email, password, direccion, numTelefono, modulos, formState,
        nombresValid, apellidoPaternoValid, apellidoMaternoValid, rfcValid, rolValid, sucursalValid, emailValid, passwordValid, direccionValid, numTelefonoValid, modulosValid,
        handleInputChange, handleResetForm, isFormSubmitted, isFormValid, setFormSubmitted
    } = useForm(createForm, createFormValidations);

    return (
        <Modal showModal={createModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 h-5/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Crear Usuario</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full h-full space-y-3 overflow-auto">
                    <form
                        onSubmit={event => handleSubmitCreateForm(event, startCreatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='nombres'
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
                            inputId='apellidoPaterno'
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
                            inputId='apellidoMaterno'
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
                            inputId='rfc'
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
                            baseUrl='roles'
                            inputId='rol'
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
                        <PaginatedSelect
                            baseUrl='sucursales'
                            inputId='sucursal'
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
                        <InputComponent
                            inputId='email'
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
                            inputId='password'
                            inputName='password'
                            inputType='password'
                            labelText='Contraseña'
                            value={password}
                            severity='error'
                            hasError={!!passwordValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={passwordValid}
                            placeholder='Contraseña'
                        />
                        <InputComponent
                            inputId='direccion'
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
                            inputId='numTelefono'
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
                        <ModulesCheckbox
                            values={modulos}
                            handleInputChange={handleInputChange}
                            severity='error'
                            errorMessage={modulosValid}
                            hasError={!!modulosValid && isFormSubmitted}
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
