import { useRecordsStorePagination } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, DisplayModules } from '../../ui';


export const UsersPagination = ({ permissions }) => {
    const { records, error, isLoading, pagesCanBeGenerated, page, nextPage, previousPage } = useRecordsStorePagination();

    return (
        <PaginationContainer data={records} error={error} isLoading={isLoading} pagesCanBeGenerated={pagesCanBeGenerated} page={page} nextPage={nextPage} previousPage={previousPage} >
            <CardsContainer>
                {
                    records?.map(usuario => (
                        <Card key={usuario.id}>
                            <DataContainer name='Nombres' data={usuario.nombres} />
                            <DataContainer name='Apellido paterno' data={usuario.apellidoPaterno} />
                            <DataContainer name='Apellido materno' data={usuario.apellidoMaterno} />
                            <DataContainer name='Rfc' data={usuario.rfc} />
                            <DataContainer name='Rol' data={usuario.rol} />
                            {
                                usuario.sucursal && <DataContainer name='Sucursal' data={usuario.sucursal.nombre} />
                            }
                            <DataContainer name='Email' data={usuario.email} />
                            <DataContainer name='Direccion' data={usuario.direccion} />
                            <DataContainer name='Teléfono' data={usuario.numTelefono} />
                            <DataContainer name='Estatus' data={usuario.activo ? 'Activo' : 'Inactivo'} />
                            <DisplayModules name='Módulos' modules={usuario.modulos} />
                            <DataContainer name='Creador' data={usuario.creador.nombres} />
                            <DataContainer name='Fecha de creación' data={usuario.fechaCreacion} convertToDate={true} />
                            <DataContainer name='Último en modificar' data={usuario.ultimoEnModificar.nombres} />
                            <DataContainer name='Fecha de última modificación' data={usuario.fechaUltimaModificacion} convertToDate={true} />
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer >
    )
}
