import { useRecordsStoreCreate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage, PaginatedSelect } from '../../ui';
import { InputComponent } from '../../../utilities';
import { stringValuesValidation, floatingPointValuesValidation } from '../../../helpers';


const createForm = {
    sucursal: '',
    producto: '',
    existencia: '',
    precio: ''
}

const createFormValidations = {
    sucursal: [stringValuesValidation, 'El campo sucursal es inválido'],
    producto: [stringValuesValidation, 'El campo producto es inválido'],
    existencia: [floatingPointValuesValidation, 'El campo existencia es inválido'],
    precio: [floatingPointValuesValidation, 'El campo precio es inválido'],
}

const handleSubmitCreateForm = (e, startCreatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    startCreatingRecord(url, payload, 'stockProducto');
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm) => {
    startCloseCreateModal();

    setFormSubmitted(false);

    handleResetForm();
}

export const StockCreateForm = ({ baseUrl }) => {
    const { isLoading, errors, error, sucessMessage, startCreatingRecord } = useRecordsStoreCreate();
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();
    const {
        sucursal, producto, existencia, precio, formState,
        sucursalValid, productoValid, existenciaValid, precioValid,
        isFormSubmitted, isFormValid, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(createForm, createFormValidations);

    return (
        <Modal showModal={createModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Crear stock</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full space-y-3 overflow-auto">
                    <form
                        onSubmit={e => handleSubmitCreateForm(e, startCreatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='existencia'
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
                            inputId='precio'
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
                        <PaginatedSelect
                            inputId='sucursal'
                            inputName='sucursal'
                            labelText='Sucursal'
                            value={sucursal}
                            handleChange={handleInputChange}
                            hasError={!!sucursalValid && isFormSubmitted}
                            errorMessage={sucursalValid}
                            severity='error'
                            baseUrl='/sucursales'
                            keyToGetData='sucursales'
                            keyToGetSelectValue='id'
                            keyToGetSelectText='nombre'
                        />
                        <PaginatedSelect
                            inputId='producto'
                            inputName='producto'
                            labelText='Producto'
                            value={producto}
                            handleChange={handleInputChange}
                            hasError={!!productoValid && isFormSubmitted}
                            errorMessage={productoValid}
                            severity='error'
                            baseUrl='/productos'
                            keyToGetData='productos'
                            keyToGetSelectValue='id'
                            keyToGetSelectText='nombre'
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
