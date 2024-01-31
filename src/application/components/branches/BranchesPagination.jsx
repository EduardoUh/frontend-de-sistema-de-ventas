import { useRecordsStorePagination, useUIStore, useRecordsStoreUpdate } from "../../../hooks"
import { Button, Card, CardsContainer, DataContainer, PaginationContainer } from "../../ui"

const handleOpenModalAndStartSelectingRecord = (startOpenUpdateModal, startSelectingRecord, record) => {
    startSelectingRecord(record);
    startOpenUpdateModal();
}

export const BranchesPagination = ({ permissions, name }) => {
    const { records, isLoading, error, page, pagesCanBeGenerated, componentName, nextPage, previousPage } = useRecordsStorePagination();
    const { startOpenUpdateModal } = useUIStore();
    const { startSelectingRecord } = useRecordsStoreUpdate();

    if (componentName !== name) return (<></>);

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} page={page} pagesCanBeGenerated={pagesCanBeGenerated} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(branchData => (
                        <Card key={branchData.id} cardStyles="mt-3 transition duration-500 ease-in-ou hover:scale-105 p-0 p-5">
                            <DataContainer name='Nombre' data={branchData.nombre} />
                            <DataContainer name='Ciudad' data={branchData.ciudad} />
                            <DataContainer name='Direccion' data={branchData.direccion} />
                            <DataContainer name='Email' data={branchData.email} />
                            <DataContainer name='Estatus' data={branchData.activa ? 'Activa' : 'Inactiva'} />
                            <DataContainer name='Creador' data={branchData.creador.nombres} />
                            <DataContainer name='Creada el' data={branchData.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Ultimo en modificar' data={branchData.ultimoEnModificar.nombres} />
                            <DataContainer name='Modificada el' data={branchData.fechaUltimaModificacion} convertToDate={true} />
                            {
                                permissions.find(permission => permission === 'ACTUALIZAR') &&
                                <Button text='Actualizar' type='button' buttonSyles='w-full' handleClick={() => handleOpenModalAndStartSelectingRecord(startOpenUpdateModal, startSelectingRecord, { id: branchData.id, nombre: branchData.nombre, ciudad: branchData.ciudad, direccion: branchData.direccion, email: branchData.email, activa: branchData.activa })} />
                            }
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
