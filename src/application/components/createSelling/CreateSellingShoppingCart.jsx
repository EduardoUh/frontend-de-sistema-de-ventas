import { useCreateSellingStore, useRecordsStorePagination } from '../../../hooks';


const fakeItems = [
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
    {
        id: Math.random() * 100,
        nombre: "Eduardo",
        ventaPor: "Pieza",
        existencia: 1,
        precio: 5,
    },
]

export const CreateSellingShoppingCart = () => {
    const { articulos } = useCreateSellingStore();
    const { records } = useRecordsStorePagination();

    return (
        <div className='border shadow-md rounded-lg flex flex-col md:flex-row md:justify-between p-2'>
            <div className='overflow-auto md:w-1/2 h-96 border'>
                {
                    /* articulos?.map(item => {
                        const record = records.find(record => record.id === item.producto);
                        return (
                            <div key={record.id} className='border'>
                                <p>{record.nombre}</p>
                                <p>{record.ventaPor}</p>
                                <p>{record.existencia}</p>
                                <p>{record.precio}</p>
                            </div>
                        );
                    }) */
                    fakeItems.map(item =>
                    (
                        <div key={item.id} className='border'>
                            <p>{item.nombre}</p>
                            <p>{item.ventaPor}</p>
                            <p>{item.existencia}</p>
                            <p>{item.precio}</p>
                        </div>
                    )
                    )
                }
            </div>
            <div className='border md:w-1/2'>
                <p>Total:</p>
                <p>Pago con:</p>
                <p>pago:</p>
                <p>cambio</p>
                <p>Saldo</p>
            </div>
        </div>
    )
}
