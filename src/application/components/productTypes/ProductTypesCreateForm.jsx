import { useRecordsStoreCreate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { InputComponent } from '../../../utilities';
import { stringValuesValidation } from '../../../helpers';


const createForm = {
    tipoProducto: '',
    descripcion: ''
}

const createFormValidations = {
    tipoProducto: [stringValuesValidation, 'El campo tipo de producto es inválido'],
    descripcion: [stringValuesValidation, 'El campo descripción es inválido']
}

const handleSubmitCreateForm = (event, startCreatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    startCreatingRecord(url, payload, 'tipoProducto');
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm) => {
    startCloseCreateModal();

    setFormSubmitted(false);

    handleResetForm();
}

export const ProductTypesCreateForm = ({ baseUrl }) => {
    const { isLoading, errors, error, sucessMessage, startCreatingRecord } = useRecordsStoreCreate();
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();
    const {
        tipoProducto, descripcion, formState,
        tipoProductoValid, descripcionValid,
        isFormValid, isFormSubmitted, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(createForm, createFormValidations);

    return (
        <Modal showModal={createModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Crear tipo de producto</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full space-y-3 overflow-auto">
                    <form
                        onSubmit={e => handleSubmitCreateForm(e, startCreatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='tipoProducto'
                            inputName='tipoProducto'
                            inputType='text'
                            labelText='Tipo de producto'
                            value={tipoProducto}
                            handleChange={handleInputChange}
                            hasError={!!tipoProductoValid && isFormSubmitted}
                            errorMessage={tipoProductoValid}
                            severity='error'
                            placeholder='Tipo de producto'
                        />
                        <InputComponent
                            inputId='descripcion'
                            inputName='descripcion'
                            inputType='text'
                            labelText='Descripción'
                            value={descripcion}
                            handleChange={handleInputChange}
                            hasError={!!descripcionValid && isFormSubmitted}
                            errorMessage={descripcionValid}
                            placeholder='Dirección'
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
