import { useForm, usePagination, useUpdateRecordStore, useUIStore } from '../../hooks';
import { InputComponent } from '../../utilities';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button, Modal } from '../ui';


const filtersForm = {
    nombre: '',
    ciudad: '',
    email: '',
    activa: '',
    creador: ''
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

const handleSumbit = (event, addFiltersFn, url, params) => {
    event.preventDefault();

    addFiltersFn(url, { ...params });
}

const handleOpenModalAndStartSelectingRecord = (openModal, startSelectingRecord, record) => {
    openModal();
    startSelectingRecord(record);

}
// Permissions in this module -> CREAR - VER -ACTUALIZAR
// TODO: take the select logic off the InputComponent and refactor it to accept pagination if there is a next page, then implement it in the InputComponent

export const Branches = ({ permissions }) => {
    const { data, isLoading, error, page, nextPage, previousPage, addFiltersToUrl } = usePagination(baseUrl);
    const { modalIsOpen, startOpenModal, startCloseModal } = useUIStore();
    const { selectedRecord, isUpdating, updatedRecord, error: updatingRecordError, startSelectingRecord, startCleaningRecord, startUpdatingRecord, startCleaningUpdatedRecord } = useUpdateRecordStore();
    const { nombre, ciudad, email, activa, creador, formState, handleInputChange, isFormSubmitted, setFormSubmitted, handleResetForm } = useForm(filtersForm);


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
                            <form className="border border-black" onSubmit={(e) => handleSumbit(e, addFiltersToUrl, baseUrl, formState)}>
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
                        <PaginationContainer data={data} isLoading={isLoading} error={error} page={page} nextPage={nextPage} previousPage={previousPage}>
                            <CardsContainer>
                                {
                                    data !== null ?
                                        data.sucursales.map(branchData => (
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
                                                    <Button text='Actualizar' type='button' buttonSyles='w-full' handleClick={() => handleOpenModalAndStartSelectingRecord(startOpenModal, startSelectingRecord, branchData)} />
                                                }
                                            </Card>
                                        ))
                                        :
                                        (
                                            <></>
                                        )
                                }
                            </CardsContainer>
                        </PaginationContainer>
                        <Modal showModal={modalIsOpen}>
                            <p className="bg-white text-black font-bold">Eduardo</p>
                        </Modal>
                    </>
                )
            }
        </div >
    )
}
