import { useState } from "react";
import './Register.css';

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onSubmitSignIn = () => {

        props.loadUser({ email, password, name });

        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then(response => response.json())
            .then(user => {
                if (user) {
                    props.onRouteChange('home');
                    props.loadUser(user);
                    console.log(user);
                }
            });
    }

    return (
        <div>
            <div>
                <label htmlFor='name'>Name</label>
                <input id='name' type='text' onChange={onNameChange} />
                <label htmlFor='email' >Email</label>
                <input id='email' type='text' onChange={onEmailChange} />
                <label htmlFor='password'>Password</label>
                <input id='password' type='text' onChange={onPasswordChange} />
                <input onClick={onSubmitSignIn} type='submit' value='Register' />

            </div>
        </div>
    );

}


export default Register;