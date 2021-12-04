import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";

const Password = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <Form.Field>
            {errors.password ? (
                <>
                    {errors.password.type === "required" && (
                        <p> {errors.password.message} </p>
                    )}
                    {errors.password.type === "minLength" && (
                        <p> Your Password must be more than 3 letters </p>
                    )}
                    {errors.password.type === "maxLength" && (
                        <p> Your Password must be smaller than 15 letters </p>
                    )}
                </>
            ) : null}
            <label>Password</label>
            <input
                placeholder='Password'
                type="text"
                {...register("password", {
                    required: "Password is Required",
                    minLength: 3,
                    maxLength: 15
                })}
            />
        </Form.Field>
    );
}

export default Password;