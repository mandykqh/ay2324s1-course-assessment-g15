import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Tab, TabList, Tabs, useToast } from "@chakra-ui/react";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import WelcomeLogo from "../components/user/userAuthentication/WelcomeLogo";
import LoginCard from "../components/user/userAuthentication/LoginCard";
import SignUpCard from "../components/user/userAuthentication/SignUpCard";
import UserRequestHandler from "../handlers/UserRequestHandler";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import { UserDataString } from "../Commons";
import { authChecker, showError, showSuccess } from "../Util";

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

  function toggleView() {
    setDisplayLoginForm(!displayLoginForm);
    setDisplaySignupForm(!displaySignupForm);
  }

  function renderLoginCard() {
    const loginHandler = () => {
      AuthRequestHandler.login(loginUserName, loginPassword)
        .then((result) => {
          saveUserData(result);
          navigate('home');
        }).catch(() =>
          showError('Invalid Credentials', toast)
        );
    }

    return (
      <LoginCard
        username={loginUserName}
        usernameSetter={setLoginUsername}
        password={loginPassword}
        passwordSetter={setLoginPassword}
        loginHandler={loginHandler}
      />
    );
  }

  function renderSignUpCard() {
    const signUpHandler = () => {
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

    return (
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
    );
  }

  function renderTabs() {
    const tabs = [
      { label: 'Login', onClick: () => toggleView() },
      { label: 'Sign Up', onClick: () => toggleView() },
    ]
    return (
      <Tabs w={'200px'} mb='10px' variant={'line'} borderRadius={5}>
        <TabList>
          {tabs.map((tab) =>
            <Tab w={'100px'} textStyle='h1' color='primary.green' onClick={tab.onClick} key={tab.label}>
              {tab.label}
            </Tab>
          )}
        </TabList>
      </Tabs>
    );
  }

  function redirectAuthenticated() {
    navigate('../home');
    return (<></>);
  }

  function renderLoginPage() {
    return (
      <Flex justify="center" align="center" minHeight="100vh">
        <WelcomeLogo />
        <Box w='100%' flex='90%'>
          {renderTabs()}
          {displayLoginForm && renderLoginCard()}
          {displaySignupForm && renderSignUpCard()}
        </Box>
      </Flex>
    );
  }

  authChecker(setIsAuthenticated);
  return isAuthenticated ? redirectAuthenticated() : renderLoginPage();
}

export default LoginPage;