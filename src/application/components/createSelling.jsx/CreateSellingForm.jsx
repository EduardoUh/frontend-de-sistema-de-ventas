import { useAuthStore } from '../../../hooks';
import { Button, PaginatedSelect } from '../../ui';
import { InputComponent } from '../../../utilities';


const createSucursalesSelectOptions = user => {
    return [{
        value: user.sucursalId,
        text: user.sucursalNombre
    }];
}

const handleInputChange = ({ target }) => {
    console.log({ [target.name]: target.value });
}

/*
    {
    "sucursal": "6574b2c69c25e03e7ed43f51",
    "cliente": "657774be8a71541208f0a05b",
    "articulos": [{"producto": "65775da88dde2c511601f204", "cantidad": 3}],
    "total": 31.5,
    "pagoCon": 0,
    "pago": 0,
    "cambio": 0,
    "saldo": 31.5
}
*/
export const CreateSellingForm = () => {
    const { user } = useAuthStore();

    return (
        <div className="relative border rounded-md shadow-md p-3">
            <form className="space-y-3" /* onSubmit={(e) => handleSubmitCreateSellingForm(e, startCreateSelling, baseUrl, payload)} */>
                <div className="flex flex-col items-center md:flex-row sm:justify-around sm:flex-wrap">
                    {
                        /* If user is SUPER USUARIO then he can choose a branch, if not send the user branch*/
                        user?.rol === 'SUPER USUARIO' ?
                            <PaginatedSelect
                                baseUrl='/sucursales'
                                inputId='sucursal'
                                inputName='sucursal'
                                labelText='Sucursal'
                                /* value={sucursal} */
                                handleChange={handleInputChange}
                                keyToGetSelectValue='id'
                                keyToGetSelectText='nombre'
                                keyToGetData='sucursales'
                                containerStyle='w-[80%] md:w-[30%]'
                            />
                            :
                            <InputComponent
                                inputId='sucursal'
                                inputName='sucursal'
                                inputType='select'
                                labelText='Sucursal'
                                disabled={true}
                                selectOptions={createSucursalesSelectOptions(user)}
                                value={user?.sucursalId}
                            />
                    }
                    {/* client is an optional field */}
                    <PaginatedSelect
                        baseUrl='/clientes'
                        inputId='cliente'
                        inputName='cliente'
                        labelText='Cliente'
                        /* value={cliente} */
                        handleChange={handleInputChange}
                        containerStyle='w-[80%] md:w-[30%]'
                        keyToGetData='clientes'
                        keyToGetSelectValue='id'
                        keyToGetSelectText='nombres'
                    />
                    {/* If user is SUPER USUARIO then don't load this until he has selected a branch
                        and if user is not then use the user.sucursalId property.
                        this means that it should be rendered conditionally, consider using the following condition for those users:
                        user?.rol === 'SUPER USUARIO' && sucursal(this must be the value of the sucursal input)
                    */}
                    {
                        /* 
                        Create a custom paginated select to display products because the logic of this one will not work
                        to get the value and text of the retrieved data from the api
                         */
                        user?.rol !== 'SUPER USUARIO' &&
                        <PaginatedSelect
                            baseUrl={`/stockProductos/sucursal/${user?.sucursalId}`}
                            inputId='producto'
                            inputName='producto'
                            labelText='Producto'
                            /* value={producto} */
                            handleChange={handleInputChange}
                            keyToGetData='stockProductos'
                            keyToGetSelectValue='id'
                            keyToGetSelectText='nombres'
                            containerStyle='w-[80%] md:w-[30%]'
                        />
                    }
                </div>
                <div className="flex flex-col gap-2 md:flex-row justify-center items-center">
                    <Button text='Añadir producto' type='button' buttonSyles='w-[80%] md:w-[30%]' />
                    <Button text='Crear Venta' type='button' buttonSyles='w-[80%] md:w-[30%]' /* handleClick={handleResetForm} */ />
                </div>
            </form>
        </div>
    )
}
