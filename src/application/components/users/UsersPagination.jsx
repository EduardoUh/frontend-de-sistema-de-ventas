import { useRecordsStorePagination, useRecordsStoreUpdate, useUIStore } from '../../../hooks';
import { PaginationContainer, CardsContainer, Card, DataContainer, DisplayModules, Button } from '../../ui';


const handleOpenModalAndStartSelectingRecord = (startOpenUpdateModal, startSelectingRecord, record) => {
    startSelectingRecord(record);

    startOpenUpdateModal();
}
export const UsersPagination = ({ permissions, name }) => {
    const { records, error, isLoading, pagesCanBeGenerated, page, componentName, nextPage, previousPage } = useRecordsStorePagination();
    const { startSelectingRecord } = useRecordsStoreUpdate();
    const { startOpenUpdateModal } = useUIStore();

    if (componentName !== name) return (<></>);

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
                            <DataContainer name='Rol' data={usuario.rol.rol} />
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
                            {
                                permissions.find(permission => permission === 'ACTUALIZAR') &&
                                <Button text='Actualizar' type='button' buttonSyles='w-full' handleClick={() => handleOpenModalAndStartSelectingRecord(startOpenUpdateModal, startSelectingRecord, usuario.sucursal ? { id: usuario.id, nombres: usuario.nombres, apellidoPaterno: usuario.apellidoPaterno, apellidoMaterno: usuario.apellidoMaterno, rfc: usuario.rfc, rol: usuario.rol.id, sucursal: usuario.sucursal.id, email: usuario.email, direccion: usuario.direccion, numTelefono: usuario.numTelefono, activo: usuario.activo, modulos: usuario.modulos.map(module => { return { nombre: module.nombre, componente: module.componente, ruta: module.ruta, permisos: module.permisos } }) } : { id: usuario.id, nombres: usuario.nombres, apellidoPaterno: usuario.apellidoPaterno, apellidoMaterno: usuario.apellidoMaterno, rfc: usuario.rfc, rol: usuario.rol.id, email: usuario.email, direccion: usuario.direccion, numTelefono: usuario.numTelefono, activo: usuario.activo, modulos: usuario.modulos.map(module => { return { nombre: module.nombre, componente: module.componente, ruta: module.ruta, permisos: module.permisos } }) })} />
                            }
                        </Card>
                    ))
                }
            </CardsContainer>
        </PaginationContainer >
    )
}
