import { Message } from '../../../utilities';


export const ShowErrorMessages = ({ hasErrors, errors }) => {
    return (
        <>
            {
                hasErrors && Object.keys(errors.errors).map(error => (
                    <Message key={errors.errors[error].path} message={errors.errors[error].msg} severity='error' />
                ))
            }
        </>
    )
}
