import { Form } from 'semantic-ui-react';
import { useFormContext } from "react-hook-form";

const Username = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <Form.Field>
            {errors.username ? (
                <>
                    {errors.username.type === "required" && (
                        <p>{errors.username.message}</p>
                    )}
                    {errors.username.type === "minLength" && (
                        <p>{errors.username.message}</p>
                    )}
                    {errors.username.type === "maxLength" && (
                        <p>{errors.username.message}</p>
                    )}
                    {errors.username.type === "pattern" && (
                        <p>{errors.username.message}</p>
                    )}
                </>
            ) : null}
            <label>Username</label>
            <input
                placeholder='Username'
                type="text"
                {...register("username", {
                    required: {
                        value: true,
                        message: "Username is Required!"
                    },
                    minLength: {
                        value: 3,
                        message: `Username must be bigger than 3 letters!`
                    },
                    maxLength: {
                        value: 15,
                        message: `Username must be smaller than 15 letters!`
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Username should consist of only english letters and digits!"
                    }
                })}
            />
        </Form.Field>
    );
}

export default Username;