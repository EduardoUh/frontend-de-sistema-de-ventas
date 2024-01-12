import { useForm, useRecordsStoreUpdate, useUIStore } from '../../../hooks';
import { InputComponent, Message } from '../../../utilities';
import { Modal } from '../../ui';
import { emailValidator, stringValuesValidation, booleanValuesValidation } from '../../../helpers';


const updateForm = {
    nombre: '',
    ciudad: '',
    direccion: '',
    email: '',
    activa: '',
}

const updateFormValidations = {
    nombre: [stringValuesValidation, 'El campo nombre es inválido'],
    ciudad: [stringValuesValidation, 'El campo ciudad es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección en inválido'],
    email: [emailValidator, 'El campo email es inválido'],
    activa: [booleanValuesValidation, 'El campo status es inválido'],
}

const selectOptions = [
    {
        value: "true",
        text: 'Activa'
    },
    {
        value: "false",
        text: 'Inactiva'
    }
]

const handleSubmitUpdateForm = (event, updateFn, url, payload, isFormValid, setFormSubmitted) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    payload.activa = payload.activa === 'true';

    delete payload.id;

    updateFn(url, payload, 'sucursal');
}

const handleCloseModalAndClearSelectedRecord = (startCloseUpdateModal, startCleaningRecord, handleResetForm, setFormSubmitted) => {
    startCloseUpdateModal();
    startCleaningRecord();
    handleResetForm();
    setFormSubmitted(false);
}

export const BranchesUpdateForm = ({ baseUrl }) => {
    const { selectedRecord, errors, error, sucessMessage, isLoading, startUpdatingRecord, startCleaningRecord } = useRecordsStoreUpdate();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();
    const {
        nombre, ciudad, email, activa, direccion, formState, nombreValid, ciudadValid, emailValid, activaValid, direccionValid,
        handleInputChange, isFormSubmitted, isFormValid, setFormSubmitted, handleResetForm
    } = useForm(selectedRecord ? selectedRecord : updateForm, updateFormValidations);

    return (
        <Modal showModal={updateModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md">
                <div className="w-full space-y-3">
                    <h3 className="text-center font-bold text-2xl">Actualizar Sucursal</h3>
                    {
                        errors.hasErrors
                            ? Object.keys(errors.errors).map(error => (
                                <Message key={errors.errors[error].path} message={errors.errors[error].msg} severity='error' />
                            ))
                            : <></>
                    }
                    {
                        error.hasError && !errors.hasErrors && <div className="flex justify-center items-center"><Message message={error.errorMessage} severity='error' messageStyle='w-1/3' /></div>
                    }
                    {
                        sucessMessage && <div className="flex justify-center items-center"><Message message={sucessMessage} severity='success' /></div>
                    }
                    <form
                        onSubmit={event => handleSubmitUpdateForm(event, startUpdatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='nombreUpdate'
                            inputName='nombre'
                            inputType='text'
                            labelText='Nombre'
                            value={nombre}
                            severity='error'
                            hasError={!!nombreValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={nombreValid}
                            placeholder='Nombre'
                        />
                        <InputComponent
                            inputId='ciudadUpdate'
                            inputName='ciudad'
                            inputType='text'
                            labelText='Ciudad'
                            value={ciudad}
                            severity='error'
                            hasError={!!ciudadValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={ciudadValid}
                            placeholder='Ciudad'
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
                            inputId='activaUpdate'
                            inputName='activa'
                            inputType='select'
                            labelText='Estatus'
                            value={activa}
                            severity='error'
                            hasError={!!activaValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={activaValid}
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
                                onClick={() => handleCloseModalAndClearSelectedRecord(startCloseUpdateModal, startCleaningRecord, handleResetForm, setFormSubmitted)}
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
