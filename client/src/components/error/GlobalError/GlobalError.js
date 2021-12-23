import { useContext } from 'react'

import { ErrorContext } from "../../../utils/Context"

const GlobalError = ({ error }) => {

    const setError = useContext(ErrorContext)[1]

    const hideAlert = () => {
        setError('')
    }

    return (<>
        {error &&
            <div className="text-center justify-content-center">
                <div className="alert alert-danger text-center  custom-error-box" role="alert">
                    {error}
                    <button type="button" className="btn btn-light ml-2 custom-global-error" onClick={hideAlert}>X</button>
                </div>
            </div>}
    </>);
}

export default GlobalError;