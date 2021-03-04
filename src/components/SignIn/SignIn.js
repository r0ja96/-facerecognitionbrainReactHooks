import React, { Component, useState } from 'react';
import './SignIn.css';

function SignIn(props) {

    const [SignInEmail, setSignInEmail] = useState('');
    const [SignInPassword, setSignInPassword] = useState('');

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    }

    const onSubmitSignIn = () => {
        console.log(SignInEmail, SignInPassword);
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: SignInEmail,
                password: SignInPassword
            })
        }).then(response => response.json())
            .then(user => {
                if (user.id) {
                    props.loadUser(user);
                    props.onRouteChange('home');
                }
            });
    }

    const { onRouteChange } = props;

    return (
        <div>
            <div>
                <label htmlFor='email'>Email</label>
                <input onChange={onEmailChange} id='email' type='text' />
                <label htmlFor='password'>Password</label>
                <input onChange={onPasswordChange} id='password' type='text' />
                <input onClick={onSubmitSignIn} type='button' value='Sign In' />
                <p onClick={() => onRouteChange('register')}>Register</p>
            </div>
        </div>
    );

}


export default SignIn;