import { Box, Button, Card, CardBody, CardHeader, Center, Container, Flex, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import './UserAuthentication.css'

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

            <Flex justify="center" align="center" minHeight="100vh">
                <Box w='100%' className="welcome">
                    <Center>
                        <Heading>Welcome to PeerPrep</Heading>
                    </Center>
                </Box>
                <Box w='100%' className="userAuthentication">
                    <Button id='logintab' onClick={() => toggleForm(false)}>Log in</Button>
                    <Button id='signuptab' onClick={() => toggleForm(true)}>Sign up</Button>

                    {displayLoginForm && (
                        <Card maxW='600px'>
                            <CardBody>
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
                            </CardBody>
                        </Card>)
                    }


                    {displaySignupForm && (
                        <Card maxW='600px'>
                            <CardHeader>
                                <Heading size='24px' >Let's get started!</Heading>
                            </CardHeader>
                            <CardBody>
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
                            </CardBody>
                        </Card>

                    )}
                </Box>

            </Flex>

        </div>

    );
}

export default LoginPage;
