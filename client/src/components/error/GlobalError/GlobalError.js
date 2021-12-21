import { useContext } from 'react'

import { ErrorContext } from "../../../utils/Context"

const GlobalError = ({ error }) => {

    const setError = useContext(ErrorContext)[1]

    const hideAlert = () => {
        setError('')
    }

    return (<>
        {error &&
            <div className="d-flex text-center">
                <div className="alert alert-danger text-center" style={{ display: "inline-block" }} role="alert">
                    {error}
                    <button type="button" className="btn btn-light ml-2" style={{ 'margin-left': "1rem" }} onClick={hideAlert}>X</button>
                </div>
            </div>}
    </>);
}

export default GlobalError;