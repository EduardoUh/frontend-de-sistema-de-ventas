import { useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer } from '../../ui';


export const CustomersPagination = ({ permissions }) => {
    const { records, isLoading, error, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();

    return (
        <PaginationContainer data={records} isLoading={isLoading} error={error} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage}>
            <CardsContainer>
                {
                    records?.map(customer =>
                    (
                        <Card key={customer.id}>
                            <DataContainer name='Nombres' data={customer.nombres} />
                            <DataContainer name='Apellido paterno' data={customer.apellidoPaterno} />
                            <DataContainer name='Apellido materno' data={customer.apellidoMaterno} />
                            <DataContainer name='Rfc' data={customer.rfc} />
                            <DataContainer name='Email' data={customer.email} />
                            <DataContainer name='Teléfono' data={customer.numTelefono} />
                            <DataContainer name='Dirección' data={customer.direccion} />
                            <DataContainer name='Estatus' data={customer.activo ? 'Activo' : 'Inactivo'} />
                            <DataContainer name='Creador' data={customer.creador?.nombres} />
                            <DataContainer name='Fecha de creación' data={customer.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Último en modificar' data={customer.ultimoEnModificar?.nombres} />
                            <DataContainer name='Fecha de última modificación' data={customer.fechaUltimaModificacion} convertToDate={true} />
                        </Card>
                    )
                    )
                }
            </CardsContainer>
        </PaginationContainer>
    )
}
