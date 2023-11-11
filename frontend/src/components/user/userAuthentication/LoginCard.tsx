import { Box, Text, Card, CardBody, FormControl, FormLabel, Input, Center, Button } from "@chakra-ui/react";
import PasswordInput from "../../common/PasswordInput";
import { useState } from "react";

interface Props {
  username: string;
  usernameSetter: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  passwordSetter: React.Dispatch<React.SetStateAction<string>>;
  loginHandler: () => void;
}

const LoginCard: React.FC<Props> =
  ({ username, usernameSetter, password, passwordSetter, loginHandler }) => {
    const [passwordShowing, setPasswordShowing] = useState(false);
    return (
      <Card maxW='550px' bg='transparent'>
        <CardBody>
          <Box mb='10px'>
            <Text as='b'>
              Username
            </Text></Box>
          <Input
            required
            placeholder='Enter username'
            mb={5}
            bg='primary.blue3'
            border='2px solid #244153'
            value={username}
            onChange={(e) => usernameSetter(e.target.value)}
            borderRadius={15} />
          <PasswordInput
            label={'Password'}
            passwordShowing={passwordShowing}
            hiddenSetter={setPasswordShowing}
            value={password}
            valueSetter={passwordSetter}
          />
          <Center>
            <Button
              type="submit"
              onClick={loginHandler}
              colorScheme={'blue'}
              mt='4'>
              Login
            </Button>
          </Center>
        </CardBody>
      </Card>
    );
  }

export default LoginCard;