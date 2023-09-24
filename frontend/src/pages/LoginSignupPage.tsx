import { Button, Card, CardHeader, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
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

    function PasswordInput() {
        const [show, setShow] = React.useState(false)
        const handleClick = () => setShow(!show)

        return (
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Cannot be less than 8 characters'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        )
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
                            placeholder='name@example.com'
                        />
                        <FormLabel htmlFor="password">Password:</FormLabel>
                        <PasswordInput />
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
                            placeholder='name@example.com'
                        />
                        <FormLabel htmlFor="name">Full name</FormLabel>
                        <Input
                            type="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Enter your full name'
                        />
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <PasswordInput />
                        <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                        <PasswordInput />
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
