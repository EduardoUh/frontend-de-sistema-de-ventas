import { useEffect } from 'react';
import { useRequest } from '../../../hooks';
import { ShowErrorMessage, Card, DataContainer } from '../../ui';


export const SellingsPayments = ({ url }) => {
    const { data, isLoading, error, requestData } = useRequest();

    useEffect(() => {
        requestData(url);
    }, []);

    return (
        <>
            {
                isLoading && <div className='font-bold text-center text-xl'>Cargando...</div>
            }
            {
                error && <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
            }
            {
                !isLoading && data?.pagos?.map(item => (
                    <Card key={item?.id}>
                        <DataContainer name='Creador' data={item?.creador?.nombres} />
                        <DataContainer name='Fecha de creación' data={item?.fechaCreacion} convertToDate={true} />
                        <DataContainer name='Pago con' data={item?.pagoCon} />
                        <DataContainer name='Cantidad' data={item?.cantidad} />
                        <DataContainer name='Cambio' data={item?.cambio} />
                        <DataContainer name='Saldo' data={item?.saldo} />
                    </Card>
                ))
            }
        </>
    )
}
