import { useRecordsStorePagination, useUIStore, useRecordsStoreUpdate } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


const openUpdateModalAndStartSelectingRecord = (startOpenUpdateModal, startSelectingRecord, record) => {
    startSelectingRecord(record);

    startOpenUpdateModal();
}

export const StockPagination = ({ permissions, name }) => {
    const { records, isLoading, error, pagesCanBeGenerated, page, componentName, nextPage, previousPage } = useRecordsStorePagination();
    const { startSelectingRecord } = useRecordsStoreUpdate();
    const { startOpenUpdateModal } = useUIStore();

    if (componentName !== name) return (<></>);

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage} >
            <CardsContainer>
                {
                    records?.map(stock => (
                        <Card key={stock?.id}>
                            <DataContainer name='Sucursal' data={stock?.sucursal?.nombre} />
                            <DataContainer name='Producto' data={stock?.producto?.nombre} />
                            <DataContainer name='Existencia' data={stock?.existencia} />
                            <DataContainer name='Precio' data={`$${stock?.precio}`} />
                            <DataContainer name='Creador' data={stock?.creador?.nombres} />
                            <DataContainer name='Fecha de creación' data={stock?.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Último en modificar' data={stock?.ultimoEnModificar?.nombres} />
                            <DataContainer name='Fecha de última modificación' data={stock?.fechaUltimaModificacion} convertToDate={true} />
                            {
                                permissions.find(permission => permission === 'ACTUALIZAR') &&
                                <Button
                                    text='Actualizar'
                                    buttonSyles='w-full'
                                    type='button'
                                    handleClick={() => openUpdateModalAndStartSelectingRecord(
                                        startOpenUpdateModal,
                                        startSelectingRecord,
                                        {
                                            id: stock?.id,
                                            sucursal: stock?.sucursal?.id,
                                            producto: stock?.producto?.id,
                                            existencia: stock?.existencia,
                                            precio: stock?.precio
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
