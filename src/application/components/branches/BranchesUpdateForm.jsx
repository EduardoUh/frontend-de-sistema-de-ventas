import { useForm, usePaginationStore, useUIStore } from "../../../hooks"
import { InputComponent, Message } from "../../../utilities"
import { Modal } from "../../ui"


const updateForm = {
    nombre: '',
    ciudad: '',
    email: '',
    activa: '',
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

const handleSubmitUpdateForm = (event, updateFn, url, payload) => {
    event.preventDefault();

    payload.activa = payload.activa === 'true';

    delete payload.id;

    updateFn(url, payload, 'sucursal');
}

const handleCloseModalAndClearSelectedRecord = (startCloseUpdateModal, startCleaningRecord) => {
    startCloseUpdateModal();
    startCleaningRecord();
}

export const BranchesUpdateForm = ({ baseUrl }) => {
    const { selectedRecord, errors, error, sucessMessage, isLoading, startUpdatingRecord, startCleaningRecord } = usePaginationStore();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();
    const { nombre, ciudad, email, activa, direccion, formState, handleInputChange, isFormSubmitted, setFormSubmitted, handleResetForm } = useForm(selectedRecord ? selectedRecord : updateForm);

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
                        onSubmit={event => handleSubmitUpdateForm(event, startUpdatingRecord, baseUrl, formState)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='nombre'
                            inputName='nombre'
                            inputType='text'
                            labelText='Nombre'
                            value={nombre}
                            severity='error'
                            hasError={false}
                            handleChange={handleInputChange}
                            errorMessage='Nombre es inválido'
                            placeholder='Nombre'
                        />
                        <InputComponent
                            inputId='ciudad'
                            inputName='ciudad'
                            inputType='text'
                            labelText='Ciudad'
                            value={ciudad}
                            severity='error'
                            hasError={false}
                            handleChange={handleInputChange}
                            errorMessage='Ciudad es inválida'
                            placeholder='Ciudad'
                        />
                        <InputComponent
                            inputId='direccion'
                            inputName='direccion'
                            inputType='text'
                            labelText='Dirección'
                            value={direccion}
                            severity='error'
                            hasError={false}
                            handleChange={handleInputChange}
                            errorMessage='Dirección es inválida'
                            placeholder='Dirección'
                        />
                        <InputComponent
                            inputId='email'
                            inputName='email'
                            inputType='email'
                            labelText='Email'
                            value={email}
                            severity='error'
                            hasError={false}
                            handleChange={handleInputChange}
                            errorMessage='Email es inválido'
                            placeholder='Email'
                        />
                        <InputComponent
                            inputId='activa'
                            inputName='activa'
                            inputType='select'
                            labelText='Estatus'
                            value={activa}
                            severity='error'
                            hasError={false}
                            handleChange={handleInputChange}
                            errorMessage='Estatus inválido'
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
                                onClick={() => handleCloseModalAndClearSelectedRecord(startCloseUpdateModal, startCleaningRecord)}
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
