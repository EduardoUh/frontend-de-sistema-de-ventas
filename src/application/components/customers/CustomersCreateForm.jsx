import { useRecordsStoreCreate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { InputComponent } from '../../../utilities';
import { stringValuesValidation, emailValidator } from '../../../helpers';


const createForm = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rfc: '',
    email: '',
    numTelefono: '',
    direccion: ''
}

const createFormValidations = {
    nombres: [stringValuesValidation, 'El campo nombres es inválido'],
    apellidoPaterno: [stringValuesValidation, 'El campo apellido paterno es inválido'],
    apellidoMaterno: [stringValuesValidation, 'El campo apellido materno es inválido'],
    rfc: [stringValuesValidation, 'El campo rfc es inválido'],
    email: [emailValidator, 'El campo email es inválido'],
    numTelefono: [stringValuesValidation, 'El campo teléfono es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección es inválido'],
}

const handleSubmitCreateForm = (e, startCreatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    startCreatingRecord(url, payload, 'cliente');
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm) => {
    startCloseCreateModal();

    setFormSubmitted(false);

    handleResetForm();
}

export const CustomersCreateForm = ({ baseUrl }) => {
    const { isLoading, errors, error, sucessMessage, startCreatingRecord } = useRecordsStoreCreate();
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();
    const {
        nombres, apellidoPaterno, apellidoMaterno, rfc, email, numTelefono, direccion, formState,
        nombresValid, apellidoPaternoValid, apellidoMaternoValid, rfcValid, emailValid, numTelefonoValid, direccionValid,
        isFormValid, isFormSubmitted, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(createForm, createFormValidations);

    return (
        <Modal showModal={createModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 h-5/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Crear Cliente</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full h-full space-y-3 overflow-auto">
                    <form
                        onSubmit={e => handleSubmitCreateForm(e, startCreatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
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
