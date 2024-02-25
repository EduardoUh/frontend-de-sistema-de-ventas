import { useForm, useUIStore, useRecordsStoreCreate } from '../../../hooks';
import { Modal, ShowErrorMessage, ShowErrorMessages, ShowSuccessMessage } from '../../ui';
import { stringValuesValidation, emailValidator } from '../../../helpers';
import { InputComponent } from '../../../utilities';


const createForm = {
    nombre: '',
    ciudad: '',
    direccion: '',
    email: '',
}

const createFormValidations = {
    nombre: [stringValuesValidation, 'El campo nombre es inválido'],
    ciudad: [stringValuesValidation, 'El campo ciudad es inválido'],
    direccion: [stringValuesValidation, 'El campo dirección es inválido'],
    email: [emailValidator, 'El campo email es inválido'],
}

const handleSubmitCreateForm = (event, startCreatingRecord, url, payload, isFormValid, setFormSubmitted) => {
    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    startCreatingRecord(url, payload, 'sucursal');
}

const handleCloseModal = (startCloseCreateModal, setFormSubmitted, handleResetForm) => {
    startCloseCreateModal();

    setFormSubmitted(false);

    handleResetForm();
}

export const BranchesCreateForm = ({ baseUrl = '' }) => {
    const { errors, error, isLoading, sucessMessage, startCreatingRecord } = useRecordsStoreCreate();
    const { createModalIsOpen, startCloseCreateModal } = useUIStore();
    const {
        nombre, ciudad, direccion, email, formState, nombreValid, ciudadValid, direccionValid, emailValid,
        handleInputChange, handleResetForm, isFormSubmitted, isFormValid, setFormSubmitted
    } = useForm(createForm, createFormValidations);

    if (!baseUrl) return (<div>baseUrl prop is required</div>);

    return (
        <Modal showModal={createModalIsOpen}>
            <div className="w-11/12 md:w-3/6 lg:w-2/6 bg-white px-6 py-8 rounded-md shadow-md">
                <div className="w-full space-y-3">
                    <h3 className="text-center font-bold text-2xl">Crear Sucursal</h3>
                    <ShowErrorMessages hasErrors={errors.hasErrors} errors={errors.errors} />
                    <ShowErrorMessage hasError={error.hasError} error={error.errorMessage} />
                    <ShowSuccessMessage successMessage={sucessMessage} />
                    <form
                        onSubmit={event => handleSubmitCreateForm(event, startCreatingRecord, baseUrl, { ...formState }, isFormValid, setFormSubmitted)}
                        className='space-y-3'
                    >
                        <InputComponent
                            inputId='nombre'
                            inputName='nombre'
                            inputType='text'
                            labelText='Nombre'
                            value={nombre}
                            severity='error'
                            hasError={!!nombreValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={nombreValid}
                            placeholder='Nombre'
                        />
                        <InputComponent
                            inputId='ciudad'
                            inputName='ciudad'
                            inputType='text'
                            labelText='Ciudad'
                            value={ciudad}
                            severity='error'
                            hasError={!!ciudadValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={ciudadValid}
                            placeholder='Ciudad'
                        />
                        <InputComponent
                            inputId='direccion'
                            inputName='direccion'
                            inputType='text'
                            labelText='Dirección'
                            value={direccion}
                            severity='error'
                            hasError={!!direccionValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={direccionValid}
                            placeholder='Dirección'
                        />
                        <InputComponent
                            inputId='email'
                            inputName='email'
                            inputType='email'
                            labelText='Email'
                            value={email}
                            severity='error'
                            hasError={!!emailValid && isFormSubmitted}
                            handleChange={handleInputChange}
                            errorMessage={emailValid}
                            placeholder='Email'
                        />
                        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full sm:w-1/3 rounded bg-indigo-600 text-white font-bold p-2  hover:bg-indigo-800 focus:bg-indigo-400`}
                            >
                                Crear
                            </button>
                            <button
                                type="button"
                                disabled={isLoading}
                                className={`w-full sm:w-1/3 rounded bg-red-600 text-white font-bold p-2  hover:bg-red-800 focus:bg-red-400`}
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
