import { useFormContext } from "react-hook-form";

const ErrorInput = (value) => {
    let valueName = value["value"];
    const { formState: { errors } } = useFormContext();
    return (<>
        {errors[valueName] ? (
            <>
                {errors[valueName].type === "required" && (
                    <p className="text-danger">{errors[valueName].message}</p>
                )}
                {errors[valueName].type === "minLength" && (
                    <p className="text-danger">{errors[valueName].message}</p>
                )}
                {errors[valueName].type === "maxLength" && (
                    <p className="text-danger">{errors[valueName].message}</p>
                )}
                {errors[valueName].type === "pattern" && (
                    <p className="text-danger">{errors[valueName].message}</p>
                )}
                {errors[valueName].type === "validate" && (
                    <p className="text-danger">{errors[valueName].message}</p>
                )}
            </>
        ) : null}
    </>);
}

export default ErrorInput;