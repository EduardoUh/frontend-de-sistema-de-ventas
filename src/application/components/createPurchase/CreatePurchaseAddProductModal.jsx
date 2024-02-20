import { useEffect } from 'react';
import { useCreatePurchaseStore, useUIStore } from '../../../hooks';
import { InputComponent } from '../../../utilities';
import { Modal, ShowErrorMessage, ShowSuccessMessage } from '../../ui';
import { validateIfAcceptFloatingPointNumbersOrNot } from '../../../helpers';


const handleSubmitCreateForm = (e, articulos, startAddingProduct, selectedProduct, startSettingSuccessMessage, startRemovingSuccessMessage, startSettingErrorMessage) => {
    e.preventDefault();

    if (articulos?.find(product => product.producto === selectedProduct.producto)) {
        startRemovingSuccessMessage();

        startSettingErrorMessage('El producto ya se encuentra en la canasta');

        return;
    }

    if (selectedProduct.precioCompra === 0 || selectedProduct.precioVenta === 0 || selectedProduct.cantidad === 0 || selectedProduct.total === 0) {
        startSettingErrorMessage('Las cantidades no pueden ser cero');

        return;
    }

    startAddingProduct(selectedProduct);

    startSettingSuccessMessage('Producto añadido con éxito');
}

const handleCloseModal = (startCloseCreateModal, startRemovingSelectedProduct, startRemovingSuccessMessage, startRemovingErrorMessage) => {
    startCloseCreateModal();

    startRemovingSelectedProduct();

    startRemovingSuccessMessage();

    startRemovingErrorMessage();
}

export const CreatePurchaseAddProductModal = () => {
    const { articulos, selectedProduct, successMessage, error, startSettingSelectedProduct, startRemovingSelectedProduct, startAddingProduct, startSettingSuccessMessage, startRemovingSuccessMessage, startSettingErrorMessage, startRemovingErrorMessage } = useCreatePurchaseStore();
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();

    useEffect(() => {
        startSettingSelectedProduct({ ...selectedProduct, total: (selectedProduct.precioCompra * selectedProduct.cantidad) });
    }, [selectedProduct.cantidad, selectedProduct.precioCompra]);

    return (
        <Modal showModal={createModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md">
                <div className="w-full space-y-3">
                    <h3 className="text-center font-bold text-2xl">Añadir producto a la compra</h3>
                    <ShowErrorMessage hasError={error.hasError} error={error.message} />
                    <ShowSuccessMessage successMessage={successMessage} />
                    <form
                        onSubmit={e => handleSubmitCreateForm(e, articulos, startAddingProduct, selectedProduct, startSettingSuccessMessage, startRemovingSuccessMessage, startSettingErrorMessage)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='producto'
                            inputName='producto'
                            inputType='text'
                            labelText='Producto'
                            value={selectedProduct.nombre}
                            handleChange={() => { }}
                            disabled={true}
                        />
                        <InputComponent
                            inputId='precioCompra'
                            inputName='precioCompra'
                            inputType='number'
                            labelText='Precio de compra'
                            placeholder={0.01}
                            step={0.01}
                            min={0.01}
                            acceptDecimals={true}
                            value={selectedProduct.precioCompra}
                            handleChange={e => startSettingSelectedProduct({ ...selectedProduct, precioCompra: /^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(e.target.value)) ? parseFloat(e.target.value) : 0 })}
                            onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, true)}
                        />
                        <InputComponent
                            inputId='precioVenta'
                            inputName='precioVenta'
                            inputType='number'
                            labelText='Precio de venta'
                            placeholder={0.01}
                            step={0.01}
                            min={0.01}
                            acceptDecimals={true}
                            value={selectedProduct.precioVenta}
                            handleChange={e => startSettingSelectedProduct({ ...selectedProduct, precioVenta: /^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(e.target.value)) ? parseFloat(e.target.value) : 0 })}
                            onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, true)}
                        />
                        <InputComponent
                            inputId='cantidad'
                            inputName='cantidad'
                            inputType='number'
                            labelText='Cantidad'
                            placeholder={selectedProduct.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                            step={selectedProduct.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                            min={selectedProduct.ventaPor === 'KILOGRAMO' ? 0.01 : 1}
                            acceptDecimals={selectedProduct.ventaPor === 'KILOGRAMO' ? true : false}
                            value={selectedProduct.cantidad}
                            handleChange={e => startSettingSelectedProduct({ ...selectedProduct, cantidad: /^(?:\d+)?(?:\.\d{1,2})?$/.test(parseFloat(e.target.value)) ? parseFloat(e.target.value) : 0 })}
                            onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, selectedProduct.ventaPor === 'KILOGRAMO')}
                        />
                        <InputComponent
                            inputId='total'
                            inputName='total'
                            inputType='number'
                            labelText='Total'
                            placeholder='0.0'
                            disabled={true}
                            value={selectedProduct.total}
                            handleChange={() => { }}
                        />
                        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
                            <button
                                type="submit"
                                className={`w-full sm:w-1/3 rounded bg-indigo-600 text-white font-bold p-2  hover:bg-indigo-800 focus:bg-indigo-400`}
                            >
                                Añadir
                            </button>
                            <button
                                type="button"
                                className={`w-full sm:w-1/3 rounded bg-red-600 text-white font-bold p-2  hover:bg-red-800 focus:bg-red-400`}
                                onClick={() => handleCloseModal(startCloseCreateModal, startRemovingSelectedProduct, startRemovingSuccessMessage, startRemovingErrorMessage)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
