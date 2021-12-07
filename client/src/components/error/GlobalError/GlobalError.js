import {useContext} from 'react'

import {ErrorContext} from "../../../utils/Context"

const GlobalError = ({ error }) => {

    const setError = useContext(ErrorContext)[1]

    const hideAlert = () => {
        setError('')
    }

    return (<>
        {error &&
            <div className="d-flex justify-content-center align-center">
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button type="button" className="btn btn-light ml-2" onClick={hideAlert}>X</button>
                </div>
            </div>}
    </>);
}

export default GlobalError;