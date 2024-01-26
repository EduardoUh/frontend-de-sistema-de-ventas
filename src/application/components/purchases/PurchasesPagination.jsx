import { useRecordsStorePagination, useRecordsStoreUpdate, useUIStore } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


const handleOpenModalAndSelectRecord = (startOpenShowMoreModal, startSelectingRecord, record) => {
    startSelectingRecord(record);

    startOpenShowMoreModal();
}

export const PurchasesPagination = () => {
    const { records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();
    const { startSelectingRecord } = useRecordsStoreUpdate();
    const { startOpenShowMoreModal } = useUIStore();

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(purchase => (
                        <Card key={purchase.id}>
                            <DataContainer name='Sucursal' data={purchase.sucursal?.nombre} />
                            <DataContainer name='Creador' data={purchase.creador?.nombres} />
                            <DataContainer name='Proveedor' data={purchase.proveedor?.nombre} />
                            <DataContainer name='Total' data={`$${purchase.total}`} />
                            <DataContainer name='Fecha de creación' data={purchase.fechaCreacion} convertToDate={true} />
                            <Button
                                text='Ver artículos'
                                type='button'
                                buttonSyles='w-full'
                                handleClick={() => handleOpenModalAndSelectRecord(startOpenShowMoreModal, startSelectingRecord, [...purchase?.articulos])}
                            />
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
