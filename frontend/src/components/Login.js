import React, { useState } from 'react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    var loginName;
    var loginPassword;

    const [message, setMessage] = useState('');

    const doLogin = async event => {
        event.preventDefault();

        var obj = { login: loginName.value, password: loginPassword.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('', // Update fetch URL
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.id <= 0) {
                setMessage('Incorrect email address or password');
            }
            else {
                var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                // window.location.href = '/logged in page';
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    // Update href registration.html to /register
    return (
        <div>
            <div className="login-container">
                <form onSubmit={doLogin}>
                <input type="text" className="loginField" id="username" placeholder="Enter your email address" required />
                <input type={showPassword ? "text" : "password"} className="loginField" id="password" placeholder="Enter your password" required />
                <label htmlFor="showPassword" className="showPasswordText">Show password</label>
                <input id="showPassword" type="checkbox" onClick={togglePasswordVisibility} />
                <input type="submit" className="login" id="login-button" value="Log in" onClick={doLogin} />
                </form>
                <span id="loginResult">{message} style={{color: '#ff2f2f'}}</span>
            </div>
            <div className="register">
                <p>First time guessing?</p>
                <a href="registration.html" id="redirectRegister">Sign up</a>
            </div>
        </div>
    );
}

export default Login;