import { Input, Box, Text, Center, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { SECONDARY_COLOR } from "../CommonStyles";
import { useNavigate, useNavigation } from "react-router-dom";
import UserRequestHandler from "../handlers/UserRequestHandler";
import { showNotification } from "../Util";
import { NotificationOptions } from "../Commons";

const DummyLoginPage = () => {
  const userRequestHandler = new UserRequestHandler();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [notificationOptions, setNotificationOptions] = useState<NotificationOptions>({ message: '', type: 'success' });
  const navigate = useNavigate();
  const toast = useToast();



  function loginHandler() {
    // console.log(userName);
    // console.log(password);

    userRequestHandler.login(userName, password).then(result => {
      if (result) {
        navigate('home');
        return;
      }
      showNotification({ message: 'Invalid credentials', type: 'error' }, toast);
    })
  }

  // notificationHook(notificationOptions, toast);

  return (
    <Center height={'100vh'}>
      <Box>
        <Text>User Name</Text>
        <Input backgroundColor={SECONDARY_COLOR} onChange={(e) => { setUserName(e.target.value) }}></Input>
        <Text mt={5}>Password</Text>
        <Input backgroundColor={SECONDARY_COLOR} type={'password'} onChange={(e) => { setPassword(e.target.value) }}></Input>
        <Button mt={5} float={'right'} onClick={loginHandler}>Login</Button>
      </Box>
    </Center>
  );
}

export default DummyLoginPage;