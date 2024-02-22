import { useState, useEffect } from 'react';
import { useRecordsStorePagination, useRecordsStoreUpdate, useUIStore, useRequest, useForm } from '../../../hooks';
import { Modal, ShowErrorMessage, ShowErrorMessages, ShowSuccessMessage } from '../../ui';
import { InputComponent } from '../../../utilities';
import { floatingPointValuesValidation, validateIfAcceptFloatingPointNumbersOrNot } from '../../../helpers';


const createFormInitialState = {
    pagoCon: 0,
    cantidad: 0,
}

const createFormValidations = {
    pagoCon: [floatingPointValuesValidation, 'Solo se aceptan dos decimales después del punto'],
    cantidad: [floatingPointValuesValidation, 'Solo se aceptan dos decimales después del punto'],
}

const handleSubmitCreateForm = (e, postData, baseUrl, payload, isFormValid, setFormSubmitted) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid || payload.cantidad > payload.saldoAnterior || payload.cantidad > payload.pagoCon || payload.cantidad === 0 || payload.pagoCon === 0) return;

    delete payload.saldoAnterior;

    postData(baseUrl, payload);
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm) => {
    startCloseCreateModal();

    setFormSubmitted(false);

    handleResetForm();
}

export const SellingsCreatePaymentModal = () => {
    const { startSettingRecords, url } = useRecordsStorePagination();
    const { selectedRecord } = useRecordsStoreUpdate();
    const { data, error, errors, isLoading, postData } = useRequest();
    const [cambio, setCambio] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();
    const {
        pagoCon, cantidad, formState,
        pagoConValid, cantidadValid,
        handleInputChange, handleResetForm, isFormSubmitted, isFormValid, setFormSubmitted
    } = useForm(createFormInitialState, createFormValidations);

    useEffect(() => {
        setCambio(pagoCon - cantidad > 0 && cantidad > 0 ? parseFloat((pagoCon - cantidad).toFixed(2)) : 0);
    }, [cantidad, pagoCon]);

    useEffect(() => {
        setSaldo(selectedRecord.saldo - cantidad >= 0 ? parseFloat((selectedRecord.saldo - cantidad).toFixed(2)) : selectedRecord.saldo);
    }, [cantidad]);

    useEffect(() => {
        !!data?.message && startSettingRecords(url);
    }, [data?.message]);

    return (
        <Modal showModal={createModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md">
                <div className="w-full space-y-3">
                    <h3 className="text-center font-bold text-2xl">Crear Pago</h3>
                    <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errorMessages} />
                    <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                    <ShowSuccessMessage successMessage={data?.message} />
                    <form
                        onSubmit={e => handleSubmitCreateForm(e, postData, '/pagos', { ...formState, venta: selectedRecord.id, cambio, saldo, saldoAnterior: selectedRecord.saldo }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='saldoAnterior'
                            inputName='saldoAnterior'
                            inputType='number'
                            labelText='Saldo anterior'
                            placeholder='0.0'
                            disabled={true}
                            value={selectedRecord.saldo}
                            handleChange={() => { }}
                        />
                        <InputComponent
                            inputId='pagoCon'
                            inputName='pagoCon'
                            inputType='number'
                            labelText='Paga con la cantidad de'
                            placeholder={0.0}
                            step={0.01}
                            min={0.01}
                            acceptDecimals={true}
                            value={pagoCon}
                            handleChange={e => handleInputChange({ target: { name: 'pagoCon', value: parseFloat(e.target.value) ? parseFloat(e.target.value) : 0 } })}
                            onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, true)}
                            severity='error'
                            hasError={!!pagoConValid && isFormSubmitted && pagoCon > 0 || pagoCon < cantidad}
                            errorMessage={!!pagoConValid && isFormSubmitted && pagoCon > 0 ? pagoConValid : 'La cantidad con que paga no puede ser menor a la cantidad abonada'}
                        />
                        <InputComponent
                            inputId='cantidad'
                            inputName='cantidad'
                            inputType='number'
                            labelText='Abona'
                            placeholder={0.0}
                            step={0.01}
                            min={0.01}
                            acceptDecimals={true}
                            value={cantidad}
                            handleChange={e => handleInputChange({ target: { name: 'cantidad', value: parseFloat(e.target.value) ? parseFloat(e.target.value) : 0 } })}
                            onBeforeInput={e => validateIfAcceptFloatingPointNumbersOrNot(e, true)}
                            hasError={!!cantidadValid && isFormSubmitted && cantidad > 0 || cantidad > selectedRecord.saldo}
                            errorMessage={!!cantidadValid && isFormSubmitted && cantidad > 0 ? cantidadValid : 'La cantidad abonada no puede ser mayor al saldo anterior'}
                        />
                        <InputComponent
                            inputId='cambio'
                            inputName='cambio'
                            inputType='number'
                            labelText='Cambio'
                            placeholder='0.0'
                            disabled={true}
                            value={cambio}
                            handleChange={() => { }}
                        />
                        <InputComponent
                            inputId='saldo'
                            inputName='saldo'
                            inputType='number'
                            labelText='Nuevo saldo'
                            placeholder='0.0'
                            disabled={true}
                            value={saldo}
                            handleChange={() => { }}
                        />
                        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full sm:w-1/3 rounded text-white font-bold p-2  ${!isLoading ? 'bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-400' : 'bg-indigo-300'}`}
                            >
                                Crear
                            </button>
                            <button
                                type="button"
                                disabled={isLoading}
                                className={`w-full sm:w-1/3 rounded text-white font-bold p-2 ${!isLoading ? 'bg-red-600 hover:bg-red-800 focus:bg-red-400' : 'bg-red-300'}`}
                                onClick={() => handleCloseModal(startCloseCreateModal, setFormSubmitted, handleResetForm)}
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
