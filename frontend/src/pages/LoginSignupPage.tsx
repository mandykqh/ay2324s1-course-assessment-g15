import React, { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName,] = useState("");

    const [displayLoginForm, setDisplayLoginForm] = useState(true);
    const [displaySignupForm, setDisplaySignupForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {

    };

    const handleSignup = () => {
    };

    const toggleForm = (isSignUp: boolean) => {
        if (isSignUp) {
            setDisplaySignupForm(true)
            setDisplayLoginForm(false)
        } else {
            setDisplayLoginForm(true)
            setDisplaySignupForm(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div>
            <h1>Welcome to PeerPrep</h1>
            <button id='logintab' onClick={() => toggleForm(false)}>Log in</button>
            <button id='signuptab' onClick={() => toggleForm(true)}>Sign up</button>

            {displayLoginForm && (
                <form className='login'>
                    <label htmlFor="email">Enter your email address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Unhide"}</button>
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>)
            }
            {displaySignupForm && (
                < form className='signup' >
                    <h2>Let's get started!</h2>

                    <label htmlFor="email">Enter your email address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="name">Full name</label>
                    <input
                        type="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Unhide"}</button>

                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Unhide"}</button>

                    <button type="button" onClick={handleSignup}>
                        Sign up
                    </button>
                </form >
            )}

        </div >
    );
}

export default LoginPage;
