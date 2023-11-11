import { Box, Flex, Tab, TabList, Tabs, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import WelcomeLogo from "../components/user/userAuthentication/WelcomeLogo";
import LoginCard from "../components/user/userAuthentication/LoginCard";
import SignUpCard from "../components/user/userAuthentication/SignUpCard";
import UserRequestHandler from "../handlers/UserRequestHandler";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../Util";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import { UserDataString } from "../Commons";

function saveUserData(result: UserDataString) {
  LocalStorageHandler.storeUserData({
    id: result.id,
    username: result.username,
    email: result.email,
    role: result.role
  });
}

function LoginPage() {
  const [loginUserName, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayLoginForm, setDisplayLoginForm] = useState(true);
  const [displaySignupForm, setDisplaySignupForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  // If user is authenticated: Saves user data and navigates to home if user is authenticated
  // Else, display error
  function loginHandler() {
    AuthRequestHandler.login(loginUserName, loginPassword)
      .then((result) => {
        saveUserData(result);
        navigate('home');
      }).catch(() =>
        showError('Invalid Credentials', toast)
      );
  }

  function toggleView() {
    setDisplayLoginForm(!displayLoginForm);
    setDisplaySignupForm(!displaySignupForm);
  }

  function signUpHandler() {
    const requiredFields = [
      { value: email, message: 'Email cannot be empty' },
      { value: signUpUsername, message: 'Username cannot be empty' },
      { value: signUpPassword, message: 'Password cannot be empty' },
    ];

    const emptyField = requiredFields.find(field => !field.value);
    if (emptyField) {
      showError(emptyField.message, toast);
      return;
    }

    if (signUpPassword !== confirmPassword) {
      showError("Passwords do not match", toast);
      return;
    }

    UserRequestHandler.createUser(signUpUsername, email, signUpPassword)
      .then(() => {
        showSuccess('You are now registered! proceed to login', toast);
        toggleView();
      }).catch((e: any) => showError(e.response.data.message, toast));
  }

  const tabs = [
    { label: 'Login', onClick: () => toggleView() },
    { label: 'Sign Up', onClick: () => toggleView() },
  ]

  // Check if User is authenticated
  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => { setIsAuthenticated(res.isAuth); console.log(res) })
      .catch(e => { console.log("Error: " + e.message); });
  }, []);

  if (isAuthenticated) {
    navigate('../home');
    return;
  }

  return (
    <>
      <Flex justify="center" align="center" minHeight="100vh">
        <WelcomeLogo />
        <Box w='100%'>
          <Tabs w={'200px'} bg={'rgb(45, 55, 72)'} variant={'line'} borderRadius={5}>
            <TabList>
              {tabs.map((tab) =>
                <Tab w={'100px'} onClick={tab.onClick} key={tab.label}>
                  {tab.label}
                </Tab>
              )}
            </TabList>
          </Tabs>
          {displayLoginForm &&
            <LoginCard
              username={loginUserName}
              usernameSetter={setLoginUsername}
              password={loginPassword}
              passwordSetter={setLoginPassword}
              loginHandler={loginHandler}
            />
          }
          {displaySignupForm &&
            <SignUpCard
              username={signUpUsername}
              usernameSetter={setSignUpUsername}
              password={signUpPassword}
              passwordSetter={setSignUpPassword}
              confirmPassword={confirmPassword}
              confirmPasswordSetter={setConfirmPassword}
              email={email}
              emailSetter={setEmail}
              signUpHandler={signUpHandler}
            />
          }
        </Box>
      </Flex>
    </>
  );
}

export default LoginPage;
