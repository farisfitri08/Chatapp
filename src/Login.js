import React from 'react';
import { useState } from 'react';

const Login = () => {
    const [name, setName] = useState("");

    const changeName = e => {
        const name = e.target.value;
        setName(name);
    }

    return (
        <div className="FormBox">
            <p>Enter your name: </p>
            <input type="text" placeholder="Name" name="name" className="nameInput" onChange={changeName}></input>
            <button value="Submit" className="button">Submit</button>
        </div>
    );
}

export default Login;