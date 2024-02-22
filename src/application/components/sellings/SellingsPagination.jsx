import { useRecordsStorePagination, useRecordsStoreUpdate, useUIStore } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, Button } from '../../ui';


const setSelectedRecordAndOpenModal = (startSelectingRecord, record, startOpenModal) => {
    startSelectingRecord(record);

    startOpenModal();
}

export const SellingsPagination = ({ permissions, name }) => {
    const { records, error, isLoading, pagesCanBeGenerated, page, componentName, nextPage, previousPage } = useRecordsStorePagination();
    const { startSelectingRecord } = useRecordsStoreUpdate();
    const { startOpenShowMoreModal, startOpenCreateModal } = useUIStore();

    if (componentName !== name) return (<></>);

    return (
        <PaginationContainer data={records} isLoading={isLoading} pagesCanBeGenerated={pagesCanBeGenerated} page={page} error={error} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(selling => (
                        <Card key={selling?.id}>
                            <DataContainer name='Sucursal' data={selling?.sucursal?.nombre} />
                            <DataContainer name='Creador' data={selling?.creador?.nombres} />
                            {
                                selling?.cliente?.nombres && <DataContainer name='Cliente' data={selling?.cliente?.nombres} />
                            }
                            <DataContainer name='Total' data={selling?.total} />
                            <DataContainer name='Pagó Con' data={selling?.pagoCon} />
                            <DataContainer name='Pago' data={selling?.pago} />
                            <DataContainer name='Cambio' data={selling?.cambio} />
                            <DataContainer name='Saldo' data={selling?.saldo} />
                            <DataContainer name='Saldada' data={selling?.saldada ? 'Si' : 'No'} />
                            <DataContainer name='Fecha de Creacion' data={selling.fechaCreacion} convertToDate={true} />
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <Button
                                    text='Ver más'
                                    type='button'
                                    buttonSyles='w-full'
                                    handleClick={() => setSelectedRecordAndOpenModal(startSelectingRecord, { id: selling?.id, articulos: selling?.articulos }, startOpenShowMoreModal)}
                                />
                                {
                                    permissions.find(permission => permission === 'CREAR PAGO') && !selling?.saldada &&
                                    < Button
                                        text='Crear pago'
                                        type='button'
                                        buttonSyles='w-full'
                                        handleClick={() => setSelectedRecordAndOpenModal(startSelectingRecord, { id: selling?.id, saldo: selling?.saldo }, startOpenCreateModal)}
                                    />
                                }
                            </div>
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
