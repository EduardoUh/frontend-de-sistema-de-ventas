import { useModules } from '../../../hooks';
import { Message } from '../../../utilities';

const handleCheckBoxChange = (selectedValues, setSelectedValues, module) => {
    if (selectedValues.find(selectedValue => selectedValue.nombre === module.nombre)) setSelectedValues({ target: { name: 'modulos', value: selectedValues.filter(selectedValue => selectedValue.nombre !== module.nombre) } });
    else setSelectedValues({ target: { name: 'modulos', value: [...selectedValues, { componente: module.componente, nombre: module.nombre, ruta: module.ruta, permisos: module.permisos }] } });
}

export const ModulesCheckbox = ({ values, handleInputChange, hasError, errorMessage, severity }) => {
    const { modulesCollection } = useModules();

    return (
        <fieldset>
            <legend className='font-semibold'>Dar permiso a:</legend>
            {
                modulesCollection.map(module =>
                (
                    <div key={module._id}>
                        <input type="checkbox" name={module.nombre} id={module._id} defaultChecked={values.find(value => value.nombre === module.nombre)} onChange={() => handleCheckBoxChange(values, handleInputChange, module)} />
                        <label htmlFor={module._id}> {module.nombre}</label>
                    </div>
                ))
            }
            {
                hasError && <Message message={errorMessage} severity={severity} />
            }
        </fieldset>
    )
}
