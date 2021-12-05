import React from 'react'
import { SpinnerCircularFixed } from 'spinners-react';

const Spinner = () => {
    return (
        <div className="text-center p-5">
            <SpinnerCircularFixed size="100" color="rgba(228,79,80,255)" secondaryColor="#676764" />
        </div>

    );
}

export default Spinner;