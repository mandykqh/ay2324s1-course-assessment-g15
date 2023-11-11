import { Box, Text, Card, CardHeader, Heading, CardBody, FormLabel, Input, Center, Button } from "@chakra-ui/react";
import { PRIMARY_COLOR } from "../../../CommonStyles";
import PasswordInput from "../../common/PasswordInput";
import { useState } from "react";

interface Props {
  username: string;
  usernameSetter: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  passwordSetter: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  confirmPasswordSetter: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  emailSetter: React.Dispatch<React.SetStateAction<string>>;
  signUpHandler: () => void;
}

const SignUpCard: React.FC<Props>
  = ({ username, usernameSetter, password, passwordSetter,
    confirmPassword, confirmPasswordSetter,
    email, emailSetter, signUpHandler }) => {
    const [passwordShowing, setPasswordShowing] = useState(false);
    const [confirmPasswordShowing, setConfirmPasswordShowing] = useState(false);
    return (
      <Card maxW='550px' bg='transparent'>
        <CardBody>
          <Box mb='10px'>
            <Text as='b'>
              Email Address
            </Text></Box>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => emailSetter(e.target.value)}
            required
            placeholder='Enter email address'
            bg='primary.blue3'
            border='2px solid #244153'
            borderRadius={15}
            mb={5}
          />
          <Box mb='10px'>
            <Text as='b'>
              Username
            </Text></Box>
          <Input
            value={username}
            onChange={(e) => usernameSetter(e.target.value)}
            required
            placeholder='Enter username'
            bg='primary.blue3'
            border='2px solid #244153'
            borderRadius={15}
            mb={5}
          />
          <PasswordInput
            hiddenSetter={setPasswordShowing}
            passwordShowing={passwordShowing}
            value={password}
            valueSetter={passwordSetter}
            label={'Password'}
          />
          <PasswordInput
            hiddenSetter={setConfirmPasswordShowing}
            passwordShowing={confirmPasswordShowing}
            value={confirmPassword}
            valueSetter={confirmPasswordSetter}
            label={'Confirm Password'}
          />
          <Center>
            <Button
              colorScheme={'blue'}
              mt='4'
              onClick={signUpHandler}
            >
              Sign up
            </Button>
          </Center>
        </CardBody>
      </Card>
    );
  }

export default SignUpCard;