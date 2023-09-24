import { Input, Box, Text, Flex, Spacer, Image, Center, Button, InputRightElement, InputGroup, background } from "@chakra-ui/react";
import { useState } from "react";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../CommonStyles";

interface PasswordInputProps {
  label: string;
  passwordShowing: boolean;
  hiddenSetter: React.Dispatch<React.SetStateAction<boolean>>;
  valueSetter: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput: React.FC<PasswordInputProps> =
  ({ label, passwordShowing, hiddenSetter, valueSetter }) => {
    return (
      <Box mb={5}>
        <Text as='b'>
          {label}
        </Text>
        <InputGroup size='md' mt={3}>
          <Input
            pr='4.5rem'
            type={passwordShowing ? 'text' : 'password'}
            placeholder={`Enter ${label.toLowerCase()}`}
            backgroundColor={PRIMARY_COLOR}
            onChange={(e) => valueSetter(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => { hiddenSetter(!passwordShowing) }} >
              {passwordShowing ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    );
  }

const UserSecurity = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  function changePasswordHandler() {
    console.log(currentPassword);
    console.log(newPassword);
    console.log(confirmPassword);
  }

  return (
    <Center flexDirection={'column'} w={'100rem'} pt={100} pb={100}>
      <Box border={'1px solid white'} borderRadius={5} p={5} w={'60%'} backgroundColor={SECONDARY_COLOR}>
        <Box marginBottom={10}>
          <Text as='b' fontSize={25}>
            Change Password
          </Text>
        </Box>
        <PasswordInput
          label='Current password'
          passwordShowing={currentPasswordVisible}
          hiddenSetter={setCurrentPasswordVisible}
          valueSetter={setCurrentPassword}
        />
        <PasswordInput
          label='New password'
          passwordShowing={newPasswordVisible}
          hiddenSetter={setNewPasswordVisible}
          valueSetter={setNewPassword}
        />
        <PasswordInput
          label='Confirm password'
          passwordShowing={confirmPasswordVisible}
          hiddenSetter={setConfirmPasswordVisible}
          valueSetter={setConfirmPassword}
        />
        <Button
          colorScheme={'blue'}
          float={'right'}
          marginTop={10}
          onClick={changePasswordHandler}
        >
          Save
        </Button>
      </Box >

      <Box border={'1px solid white'} borderRadius={5} p={5} mt={10} w={'60%'} backgroundColor={SECONDARY_COLOR}>
        <Box marginBottom={10}>
          <Text as='b' fontSize={25}>
            Delete Account
          </Text>
          <Box mt={10}>
            <Box mb={5}>
              <Text>
                Deleting your accout will remove all your information from our database. This cannot be undone.
              </Text>
            </Box>
            <Text as='sub' color={'#999999'}>To confirm this, type "DELETE"</Text>
          </Box>
          <Center height={50}>
            <Input></Input>
          </Center>
          <Button
            colorScheme={'red'}
            float={'right'}
            marginTop={5}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default UserSecurity;