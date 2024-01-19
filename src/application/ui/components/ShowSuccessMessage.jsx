import { Message } from '../../../utilities';


export const ShowSuccessMessage = ({ successMessage }) => {
    return (
        <>
            {
                successMessage && <Message message={successMessage} severity='success' />
            }
        </>
    )
}
