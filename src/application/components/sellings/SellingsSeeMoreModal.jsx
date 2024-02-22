import { useState } from 'react';
import { useRecordsStoreUpdate, useUIStore } from '../../../hooks';
import { Modal, CardsContainer, Card, DataContainer } from '../../ui';
import { SellingsPayments } from './SellingsPayments';


const handleCloseModalAndCleanSelectedRecord = (startCleaningRecord, startCloseShowMoreModal) => {
    startCloseShowMoreModal();

    startCleaningRecord();
}

export const SellingsSeeMoreModal = ({ permissions }) => {
    const [tab, setTab] = useState('Artículos');
    const { selectedRecord, startCleaningRecord } = useRecordsStoreUpdate();
    const { showMoreModalIsOpen, startCloseShowMoreModal } = useUIStore();

    return (
        <Modal showModal={showMoreModalIsOpen}>
            <div className="w-11/12 md:w-5/6 h-5/6 bg-white px-6 py-2 rounded-md shadow-md overflow-auto">
                <div className='font-bold text-center h-[5%] flex justify-start'>
                    <button className='border rounded-t-md p-2' type='button' onClick={() => setTab('Artículos')}>
                        Artículos
                    </button>
                    {
                        permissions.find(permission => permission === 'VER PAGOS') &&
                        <button className='border rounded-t-md p-2' type='button' onClick={() => setTab('Pagos')}>
                            Pagos
                        </button >
                    }
                </div>
                <div className="w-full h-[90%] space-y-3 overflow-auto">
                    <CardsContainer>
                        {
                            tab === 'Artículos' && selectedRecord?.articulos?.map(item => (
                                <Card key={item?._id}>
                                    <DataContainer name='Producto' data={item?.producto?.nombre} />
                                    <DataContainer name='Cantidad' data={item?.cantidad} />
                                </Card>
                            ))
                        }
                        {
                            tab === 'Pagos' && <SellingsPayments url={`/pagos/venta/${selectedRecord.id}`} />
                        }
                    </CardsContainer>
                </div>
                <div className='flex justify-center items-center h-[5%]'>
                    <button
                        type="button"
                        className={`w-2/4 sm:w-1/4 rounded bg-red-600 text-white font-bold p-2  hover:bg-red-800 focus:bg-red-400`}
                        onClick={() => handleCloseModalAndCleanSelectedRecord(startCleaningRecord, startCloseShowMoreModal)}
                    >
                        Cerrar
                    </button>
                </div>
            </div >
        </Modal >
    )
}
