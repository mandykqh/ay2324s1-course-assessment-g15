import { Button, Card, CardHeader, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
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
            <Heading>Welcome to PeerPrep</Heading>
            <Button id='logintab' onClick={() => toggleForm(false)}>Log in</Button>
            <Button id='signuptab' onClick={() => toggleForm(true)}>Sign up</Button>

            {displayLoginForm && (
                <Card maxW='600px'>
                    <FormControl>
                        <FormLabel htmlFor="email">Enter your email address:</FormLabel>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FormLabel htmlFor="password">Password:</FormLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Unhide"}</Button>
                        <Button type="submit" onClick={handleLogin}>
                            Login
                        </Button>
                    </FormControl>
                </Card>)
            }


            {displaySignupForm && (
                <Card maxW='600px'>
                    <CardHeader>
                        <Heading size='24px' >Let's get started!</Heading>
                    </CardHeader>
                    <FormControl className='signup' >
                        <FormLabel htmlFor="email">Enter your email address:</FormLabel>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FormLabel htmlFor="name">Full name</FormLabel>
                        <Input
                            type="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Unhide"}</button>

                        <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Button type="button" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Unhide"}</Button>

                        <Button type="submit" onClick={handleSignup}>
                            Sign up
                        </Button>
                    </FormControl >
                </Card>

            )}

        </div >
    );
}

export default LoginPage;
