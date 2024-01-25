import { useRecordsStoreUpdate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { InputComponent } from '../../../utilities';
import { floatingPointValuesValidation } from '../../../helpers';


const updateFormValidations = {
    existencia: [floatingPointValuesValidation, 'El campo existencia es inválido'],
    precio: [floatingPointValuesValidation, 'El campo precio es inválido']
}

const handleSubmitUpdateForm = (e, startUpdatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    delete payload.id;

    startUpdatingRecord(url, payload, 'stockProducto');
}

const handleCloseModal = (startCloseUpdateModal, setFormSubmitted, handleResetForm, startCleaningRecord) => {
    startCloseUpdateModal();

    startCleaningRecord();

    handleResetForm();

    setFormSubmitted(false);
}

export const StockUpdateForm = ({ baseUrl }) => {
    const { selectedRecord, isLoading, errors, error, sucessMessage, startUpdatingRecord, startCleaningRecord } = useRecordsStoreUpdate();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();
    const {
        existencia, precio, formState,
        existenciaValid, precioValid,
        isFormSubmitted, isFormValid, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(selectedRecord, updateFormValidations);

    return (
        <Modal showModal={updateModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Actualizar Stock</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full h-full overflow-auto">
                    <form
                        onSubmit={e => handleSubmitUpdateForm(e, startUpdatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='existenciaUpdate'
                            inputName='existencia'
                            inputType='number'
                            labelText='Existencia'
                            value={existencia}
                            severity='error'
                            hasError={!!existenciaValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={existenciaValid}
                            placeholder='ej. 10 - 10.55'
                        />
                        <InputComponent
                            inputId='precioUpdate'
                            inputName='precio'
                            inputType='number'
                            labelText='Precio'
                            value={precio}
                            severity='error'
                            hasError={!!precioValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={precioValid}
                            placeholder='ej. 10 - 10.55'
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
