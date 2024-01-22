import { useRecordsStoreUpdate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessage, ShowErrorMessages, ShowSuccessMessage } from '../../ui';
import { stringValuesValidation, booleanValuesValidation } from '../../../helpers';
import { InputComponent } from '../../../utilities';


const updateFormValidations = {
    tipoProducto: [stringValuesValidation, 'El campo tipo de producto es inválido'],
    descripcion: [stringValuesValidation, 'El campo descripción es inválido'],
    activo: [booleanValuesValidation, 'El campo activo es inválido']
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

    startUpdatingRecord(url, payload, 'tipoProducto');
}

const handleCloseModal = (startCloseUpdateModal, setFormSubmitted, handleResetForm, startCleaningRecord) => {
    startCloseUpdateModal();

    startCleaningRecord();

    handleResetForm();

    setFormSubmitted(false);
}

export const ProductTypesUpdateForm = ({ baseUrl }) => {
    const { selectedRecord, errors, error, isLoading, sucessMessage, startUpdatingRecord, startCleaningRecord } = useRecordsStoreUpdate();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();
    const {
        tipoProducto, descripcion, activo, formState,
        tipoProductoValid, descripcionValid, activoValid,
        isFormSubmitted, isFormValid, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(selectedRecord, updateFormValidations);

    return (
        <Modal showModal={updateModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Actualizar tipo de producto</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full h-full overflow-auto">
                    <form
                        onSubmit={event => handleSubmitUpdateForm(event, startUpdatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='tipoProductoUpdate'
                            inputName='tipoProducto'
                            inputType='text'
                            labelText='Tipo de producto'
                            value={tipoProducto}
                            severity='error'
                            hasError={!!tipoProductoValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={tipoProductoValid}
                            placeholder='Tipo de producto'
                        />
                        <InputComponent
                            inputId='descripcionUpdate'
                            inputName='descripcion'
                            inputType='text'
                            labelText='Descripción'
                            value={descripcion}
                            severity='error'
                            hasError={!!descripcionValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={descripcionValid}
                            placeholder='Descripción'
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
