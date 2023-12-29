import { useForm, usePaginationStore, useUIStore } from '../../hooks';
import { InputComponent, Message } from '../../utilities';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button, Modal } from '../ui';


const filtersForm = {
    nombre: '',
    ciudad: '',
    email: '',
    activa: '',
    creador: ''
}

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

const baseUrl = '/sucursales';
const keyToGetCollectionOfData = 'sucursales';

const handleSumbitFiltersForm = (event, addFiltersFn, url, params) => {
    event.preventDefault();

    addFiltersFn(url, { ...params });
}

const handleSubmitUpdateForm = (event, updateFn, url, payload) => {
    event.preventDefault();

    payload.activa = payload.activa === 'true' ? true : false;

    updateFn(url, payload, 'sucursal');
}

const handleOpenModalAndStartSelectingRecord = (openModal, startSelectingRecord, record) => {
    openModal();
    startSelectingRecord(record);

}

const handleCloseModalAndClearSelectedRecord = (closeModal, startCleaningRecord) => {
    closeModal();
    startCleaningRecord();
}

// Permissions in this module -> CREAR - VER -ACTUALIZAR
// TODO: take the select logic off the InputComponent and refactor it to accept pagination if there is a next page, then implement it in the InputComponent

export const Branches = ({ permissions }) => {
    const {
        records, isLoading, error, page, pagesCanBeGenerated, nextPage, previousPage, addFiltersToUrl,
        errors, selectedRecord, sucessMessage, startSelectingRecord, startCleaningRecord, startUpdatingRecord,
    } = usePaginationStore(baseUrl, keyToGetCollectionOfData);

    const { modalIsOpen, startOpenModal, startCloseModal } = useUIStore();

    const { nombre, ciudad, email, activa, creador, formState, handleInputChange, isFormSubmitted, setFormSubmitted, handleResetForm } = useForm(filtersForm);
    const { nombre: nombreToUpdate, ciudad: ciudadToUpdate, email: emailToUpdate, activa: statusToUpdate, direccion: direccionToUpdate, formState: updateFormState, handleInputChange: handleInputChangeUpdate, isFormSubmitted: isUpdateFormSubmitted, setFormSubmitted: setUpdateFormSubmitted, handleResetForm: handleResetUpdateForm } = useForm(selectedRecord ? selectedRecord : updateForm);


    if (!permissions || !Array.isArray(permissions) || Array.isArray(permissions) && permissions.length === 0) return (<div>Sin credenciales en &eacute;ste m&oacute;dulo</div>)

    console.log(1);

    return (
        <div className="space-y-3">
            <h2 className="text-center font-bold text-lg">Sucursales</h2>
            {
                permissions.find(permission => permission === 'CREAR') &&
                (
                    <div className="p-2">
                        <button className="rounded-3xl px-3 py-1 bg-gradient-to-br from-blue-500  to-purple-300 text-white font-bold text-3xl flex justify-center items-center transition hover:scale-110 hover:bg-indigo-700">
                            +
                        </button>
                    </div>
                )
            }
            {
                permissions.find(permission => permission === 'VER') &&
                (
                    // TODO: Implement the following filters -> nombre, ciudad, email, activa, creador(id)
                    <>
                        <div className="border">
                            <form className="border border-black" onSubmit={(e) => handleSumbitFiltersForm(e, addFiltersToUrl, baseUrl, formState)}>
                                <div className="flex flex-wrap justify-around">
                                    <InputComponent
                                        inputId='nombre'
                                        inputName='nombre'
                                        inputType='text'
                                        placeholder='Nombre de la sucursal'
                                        labelText='Filtrar por nombre'
                                        handleChange={handleInputChange}
                                        value={nombre}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='ciudad'
                                        inputName='ciudad'
                                        inputType='text'
                                        placeholder='Nombre de la ciudad'
                                        labelText='Filtrar por ciudad'
                                        handleChange={handleInputChange}
                                        value={ciudad}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='email'
                                        inputName='email'
                                        inputType='text'
                                        placeholder='Email'
                                        labelText='Filtrar por email'
                                        handleChange={handleInputChange}
                                        value={email}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                    <InputComponent
                                        inputId='activa'
                                        inputName='activa'
                                        inputType='select'
                                        labelText='Filtrar status'
                                        handleChange={handleInputChange}
                                        value={activa}
                                        selectOptions={selectOptions}
                                        containerStyle='border border-red-400 w-[30%]'
                                    />
                                </div>
                                <button className="bg-indigo-500 font-bold text-white" type="submit">
                                    Filtrar
                                </button>
                            </form>
                        </div>
                        <PaginationContainer data={records} isLoading={isLoading} error={error} page={page} pagesCanBeGenerated={pagesCanBeGenerated} nextPage={nextPage} previousPage={previousPage}>
                            <CardsContainer>
                                {
                                    records?.map(branchData => (
                                        <Card key={branchData.id} cardStyles="mt-3 transition duration-500 ease-in-ou hover:scale-105 p-0 p-5">
                                            <DataContainer name='Nombre' data={branchData.nombre} />
                                            <DataContainer name='Ciudad' data={branchData.ciudad} />
                                            <DataContainer name='Direccion' data={branchData.direccion} />
                                            <DataContainer name='Email' data={branchData.email} />
                                            <DataContainer name='Estatus' data={branchData.activa ? 'Activa' : 'inactiva'} />
                                            <DataContainer name='Creador' data={branchData.creador.nombres} />
                                            <DataContainer name='Creada el' data={branchData.fechaCreacion} convertToDate={true} />
                                            <DataContainer name='Ultimo en modificar' data={branchData.ultimoEnModificar.nombres} />
                                            <DataContainer name='Modificada el' data={branchData.fechaUltimaModificacion} convertToDate={true} />
                                            {
                                                permissions.find(permission => permission === 'ACTUALIZAR') &&
                                                <Button text='Actualizar' type='button' buttonSyles='w-full' handleClick={() => handleOpenModalAndStartSelectingRecord(startOpenModal, startSelectingRecord, { id: branchData.id, nombre: branchData.nombre, ciudad: branchData.ciudad, direccion: branchData.direccion, email: branchData.email, activa: branchData.activa })} />
                                            }
                                        </Card>
                                    ))
                                }
                            </CardsContainer>
                        </PaginationContainer>
                    </>
                )
            }
            <Modal showModal={modalIsOpen}>
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
                            onSubmit={e => handleSubmitUpdateForm(e, startUpdatingRecord, baseUrl, updateFormState)}
                            className='space-y-3'
                        >
                            <InputComponent
                                inputId='nombre'
                                inputName='nombre'
                                inputType='text'
                                labelText='Nombre'
                                value={nombreToUpdate}
                                severity='error'
                                hasError={false}
                                handleChange={handleInputChangeUpdate}
                                errorMessage='Nombre es inválido'
                                placeholder='Nombre'
                            />
                            <InputComponent
                                inputId='ciudad'
                                inputName='ciudad'
                                inputType='text'
                                labelText='Ciudad'
                                value={ciudadToUpdate}
                                severity='error'
                                hasError={false}
                                handleChange={handleInputChangeUpdate}
                                errorMessage='Ciudad es inválida'
                                placeholder='Ciudad'
                            />
                            <InputComponent
                                inputId='direccion'
                                inputName='direccion'
                                inputType='text'
                                labelText='Dirección'
                                value={direccionToUpdate}
                                severity='error'
                                hasError={false}
                                handleChange={handleInputChangeUpdate}
                                errorMessage='Dirección es inválida'
                                placeholder='Dirección'
                            />
                            <InputComponent
                                inputId='email'
                                inputName='email'
                                inputType='email'
                                labelText='Email'
                                value={emailToUpdate}
                                severity='error'
                                hasError={false}
                                handleChange={handleInputChangeUpdate}
                                errorMessage='Email es inválido'
                                placeholder='Email'
                            />
                            <InputComponent
                                inputId='activa'
                                inputName='activa'
                                inputType='select'
                                labelText='Estatus'
                                value={statusToUpdate}
                                severity='error'
                                hasError={false}
                                handleChange={handleInputChangeUpdate}
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
                                    onClick={() => handleCloseModalAndClearSelectedRecord(startCloseModal, startCleaningRecord)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div >
    )
}
