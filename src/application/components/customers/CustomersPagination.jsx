import { useRecordsStorePagination, useRecordsStoreUpdate, useUIStore } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


const handleOpenModalAndStartSelectingRecord = (startOpenUpdateModal, startSelectingRecord, record) => {
    startSelectingRecord(record);

    startOpenUpdateModal();
}

export const CustomersPagination = ({ permissions, name }) => {
    const { records, isLoading, error, pagesCanBeGenerated, page, componentName, nextPage, previousPage } = useRecordsStorePagination();
    const { startSelectingRecord } = useRecordsStoreUpdate();
    const { startOpenUpdateModal } = useUIStore();

    if (componentName !== name) return (<></>);

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(customer =>
                    (
                        <Card key={customer.id}>
                            <DataContainer name='Nombres' data={customer.nombres} />
                            <DataContainer name='Apellido paterno' data={customer.apellidoPaterno} />
                            <DataContainer name='Apellido materno' data={customer.apellidoMaterno} />
                            <DataContainer name='Rfc' data={customer.rfc} />
                            <DataContainer name='Email' data={customer.email} />
                            <DataContainer name='Teléfono' data={customer.numTelefono} />
                            <DataContainer name='Dirección' data={customer.direccion} />
                            <DataContainer name='Estatus' data={customer.activo ? 'Activo' : 'Inactivo'} />
                            <DataContainer name='Creador' data={customer.creador.nombres} />
                            <DataContainer name='Fecha de creación' data={customer.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Último en modificar' data={customer.ultimoEnModificar.nombres} />
                            <DataContainer name='Fecha de última modificación' data={customer.fechaUltimaModificacion} convertToDate={true} />
                            {
                                permissions.find(permission => permission === 'ACTUALIZAR') &&
                                <Button
                                    text='Actualizar'
                                    type='button'
                                    buttonSyles='w-full'
                                    handleClick={() => handleOpenModalAndStartSelectingRecord(
                                        startOpenUpdateModal,
                                        startSelectingRecord,
                                        {
                                            id: customer.id,
                                            nombres: customer.nombres,
                                            apellidoPaterno: customer.apellidoPaterno,
                                            apellidoMaterno: customer.apellidoMaterno,
                                            rfc: customer.rfc,
                                            email: customer.email,
                                            numTelefono: customer.numTelefono,
                                            direccion: customer.direccion,
                                            activo: customer.activo
                                        }
                                    )}
                                />
                            }
                        </Card>
                    )
                    )
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
