import { useRecordsStorePagination, useRecordsStoreUpdate, useUIStore } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


const handleOpenModalAndStartSelectingRecord = (startOpenUpdateModal, startSelectingRecord, record) => {
    startSelectingRecord(record);

    startOpenUpdateModal();
}

export const ProductsPagination = ({ permissions }) => {
    const { records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();
    const { startSelectingRecord } = useRecordsStoreUpdate();
    const { startOpenUpdateModal } = useUIStore();

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(product => (
                        <Card key={product.id}>
                            <DataContainer name='Nombre' data={product.nombre} />
                            <DataContainer name='Descripción' data={product.descripcion} />
                            <DataContainer name='Tipo de producto' data={product.tipoProducto?.tipoProducto} />
                            <DataContainer name='Proveedor' data={product.proveedor?.nombre} />
                            <DataContainer name='Venta por' data={product.ventaPor} />
                            <DataContainer name='Estatus' data={product.activo ? 'Activo' : 'Inactivo'} />
                            <DataContainer name='Creador' data={product.creador?.nombres} />
                            <DataContainer name='Fecha de creación' data={product.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Último en modificar' data={product.ultimoEnModificar?.nombres} />
                            <DataContainer name='Fecha de última modificación' data={product.fechaUltimaModificacion} convertToDate={true} />
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
                                            id: product.id,
                                            nombre: product.nombre,
                                            descripcion: product.descripcion,
                                            tipoProducto: product.tipoProducto?.id,
                                            proveedor: product.proveedor?.id,
                                            ventaPor: product.ventaPor,
                                            activo: product.activo,
                                        }
                                    )}
                                />
                            }
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
