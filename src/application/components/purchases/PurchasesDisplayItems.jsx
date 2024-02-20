import { useUIStore, useRecordsStoreUpdate } from '../../../hooks';
import { Modal, CardsContainer, Card, DataContainer } from '../../ui';


const handleCloseModalAndCleanSelectedRecord = (startCleaningRecord, startCloseShowMoreModal) => {
    startCloseShowMoreModal();

    startCleaningRecord();
}

export const PurchasesDisplayItems = () => {
    const { selectedRecord, startCleaningRecord } = useRecordsStoreUpdate();
    const { showMoreModalIsOpen, startCloseShowMoreModal } = useUIStore();

    return (
        <Modal showModal={showMoreModalIsOpen}>
            <div className="w-11/12 md:w-5/6 h-5/6 bg-white px-6 py-2 rounded-md shadow-md overflow-auto">
                <h3 className='font-bold text-center h-[5%]'>Artículos de la compra</h3>
                <div className="w-full h-[90%] space-y-3 overflow-auto">
                    <CardsContainer>
                        {
                            selectedRecord?.map(item => (
                                <Card key={item._id}>
                                    <DataContainer name='Producto' data={item?.producto?.nombre} />
                                    <DataContainer name='Precio de compra' data={item?.precioCompra} />
                                    <DataContainer name='Precio de venta' data={item?.precioVenta} />
                                    <DataContainer name='Cantidad' data={item?.cantidad} />
                                </Card>
                            )
                            )
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
            </div>
        </Modal >
    )
}
