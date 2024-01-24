import { useRecordsStoreCreate, useUIStore, useForm } from '../../../hooks';
import { Modal, ShowErrorMessages, ShowErrorMessage, ShowSuccessMessage, PaginatedSelect } from '../../ui';
import { InputComponent } from '../../../utilities';
import { stringValuesValidation } from '../../../helpers';


const createForm = {
    nombre: '',
    descripcion: '',
    tipoProducto: '',
    proveedor: '',
    ventaPor: ''
}

const createFormValidations = {
    nombre: [stringValuesValidation, 'El campo nombre es inválido'],
    descripcion: [stringValuesValidation, 'El campo descripción es inválido'],
    tipoProducto: [stringValuesValidation, 'El campo tipo de producto es inválido'],
    proveedor: [stringValuesValidation, 'El campo proveedor es inválido'],
    ventaPor: [stringValuesValidation, 'El campo venta por es inválido']
}

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

const handleSubmitCreateForm = (e, startCreatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    payload.activo = String(payload.activo) === 'true';

    delete payload.id;

    startCreatingRecord(url, payload, 'producto');
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm) => {
    startCloseCreateModal();

    handleResetForm();

    setFormSubmitted(false);
}

export const ProductsCreateForm = ({ baseUrl }) => {
    const { isLoading, errors, error, sucessMessage, startCreatingRecord } = useRecordsStoreCreate();
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();
    const {
        nombre, descripcion, tipoProducto, proveedor, ventaPor, formState,
        nombreValid, descripcionValid, tipoProductoValid, proveedorValid, ventaPorValid,
        isFormSubmitted, isFormValid, handleInputChange, setFormSubmitted, handleResetForm
    } = useForm(createForm, createFormValidations);

    return (
        <Modal showModal={createModalIsOpen} >
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md overflow-auto">
                <h3 className="text-center font-bold text-2xl">Crear producto</h3>
                <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                <ShowSuccessMessage successMessage={sucessMessage} />
                <div className="w-full h-full overflow-auto">
                    <form
                        onSubmit={e => handleSubmitCreateForm(e, startCreatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='nombre'
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
                            inputId='descripcion'
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
                            inputId='ventaPor'
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
                            inputId='tipoProducto'
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
                            inputId='proveedor'
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
