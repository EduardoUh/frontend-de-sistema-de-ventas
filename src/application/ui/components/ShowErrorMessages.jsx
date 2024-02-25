import { Message } from '../../../utilities';


export const ShowErrorMessages = ({ hasErrors, errors }) => {
    return (
        <>
            {
                hasErrors && Object.keys(errors).map(error => (
                    <Message key={errors[error].path} message={errors[error].msg} severity='error' />
                ))
            }
        </>
    )
}
