import { useRecordsStorePagination, useRecordsStoreUpdate, useUIStore } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


const handleOpenModalAndStartSelectingRecord = (startOpenUpdateModal, startSelectingRecord, record) => {
    startSelectingRecord(record);

    startOpenUpdateModal();
}

export const ProductTypesPagination = ({ permissions, name }) => {
    const { records, error, isLoading, pagesCanBeGenerated, page, componentName, nextPage, previousPage } = useRecordsStorePagination();
    const { startSelectingRecord } = useRecordsStoreUpdate();
    const { startOpenUpdateModal } = useUIStore();

    if (componentName !== name) return (<></>);

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage} >
            <CardsContainer>
                {
                    records?.map(productType => (
                        <Card key={productType?.id}>
                            <DataContainer name='Tipo de producto' data={productType?.tipoProducto} />
                            <DataContainer name='Descripción' data={productType?.descripcion} />
                            <DataContainer name='Estatus' data={productType?.activo ? 'Activo' : 'Inactivo'} />
                            <DataContainer name='Creador' data={productType?.creador?.nombres} />
                            <DataContainer name='Fecha de creación' data={productType?.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Ultimo en modificar' data={productType?.ultimoEnModificar?.nombres} />
                            <DataContainer name='Fecha de última modificación' data={productType?.fechaUltimaModificacion} convertToDate={true} />
                            {
                                permissions.find(permission => permission === 'ACTUALIZAR')
                                && <Button
                                    text='Actualizar'
                                    type='button'
                                    buttonSyles='w-full'
                                    handleClick={() => handleOpenModalAndStartSelectingRecord(
                                        startOpenUpdateModal,
                                        startSelectingRecord,
                                        {
                                            id: productType?.id,
                                            tipoProducto: productType?.tipoProducto,
                                            descripcion: productType?.descripcion,
                                            activo: productType?.activo,
                                        }
                                    )
                                    }
                                />
                            }
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
