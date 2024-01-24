import { useRecordsStoreUpdate, useUIStore, useForm } from '../../../hooks';
import { Modal, PaginatedSelect, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { InputComponent } from '../../../utilities';
import { stringValuesValidation, booleanValuesValidation } from '../../../helpers';


const updateFormValidations = {
    nombre: [stringValuesValidation, 'El campo nombre es inválido'],
    descripcion: [stringValuesValidation, 'El campo descripción es inválido'],
    tipoProducto: [stringValuesValidation, 'El campo tipo de producto es inválido'],
    proveedor: [stringValuesValidation, 'El campo proveedor es inválido'],
    ventaPor: [stringValuesValidation, 'El campo venta por es inválido'],
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

const ventaPorOptions = [
    {
        value: 'KILOGRAMO',
        text: 'KILOGRAMO'
    },
    {
        value: 'PIEZA',
        text: 'PIEZA'
    }
]

const handleSubmitUpdateForm = (e, startUpdatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    payload.activo = String(payload.activo) === 'true';

    delete payload.id;

    startUpdatingRecord(url, payload, 'producto');
}

const handleCloseModal = (startCloseUpdateModal, setFormSubmitted, handleResetForm, startCleaningRecord) => {
    startCloseUpdateModal();

    startCleaningRecord();

    handleResetForm();

    setFormSubmitted(false);
}

export const ProductsUpdateForm = ({ baseUrl }) => {
    const { selectedRecord, isLoading, errors, error, sucessMessage, startUpdatingRecord, startCleaningRecord } = useRecordsStoreUpdate();
    const { updateModalIsOpen, startCloseUpdateModal } = useUIStore();
    const {
        nombre, descripcion, tipoProducto, proveedor, ventaPor, activo, formState,
        nombreValid, descripcionValid, tipoProductoValid, proveedorValid, ventaPorValid, activoValid,
        isFormSubmitted, isFormValid, handleInputChange, handleResetForm, setFormSubmitted
    } = useForm(selectedRecord, updateFormValidations);


    return (
        <Modal showModal={updateModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Actualizar producto</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full h-full overflow-auto">
                    <form
                        onSubmit={e => handleSubmitUpdateForm(e, startUpdatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
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
                        <InputComponent
                            inputId='ventaPorUpdate'
                            inputName='ventaPor'
                            inputType='select'
                            labelText='Venta por'
                            value={ventaPor}
                            selectOptions={ventaPorOptions}
                            severity='error'
                            hasError={!!ventaPorValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={ventaPorValid}
                        />
                        <PaginatedSelect
                            inputId='tipoProductoUpdate'
                            inputName='tipoProducto'
                            labelText='Tipo de producto'
                            baseUrl='/tiposProductos'
                            keyToGetData='tiposProductos'
                            keyToGetSelectValue='id'
                            keyToGetSelectText='tipoProducto'
                            value={tipoProducto}
                            handleChange={handleInputChange}
                            hasError={!!tipoProductoValid && isFormSubmitted}
                            errorMessage={tipoProductoValid}
                        />
                        <PaginatedSelect
                            inputId='proveedorUpdate'
                            inputName='proveedor'
                            labelText='Proveedor'
                            baseUrl='/proveedores'
                            keyToGetData='proveedores'
                            keyToGetSelectValue='id'
                            keyToGetSelectText='nombre'
                            value={proveedor}
                            handleChange={handleInputChange}
                            hasError={!!proveedorValid && isFormSubmitted}
                            errorMessage={proveedorValid}
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
