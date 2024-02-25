import { Message } from '../../../utilities';


export const ShowErrorMessage = ({ hasError, error }) => {
    return (
        <>
            {
                hasError && <Message message={error} severity='error' />
            }
        </>
    )
}
