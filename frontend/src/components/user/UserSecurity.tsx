import { Input, Box, Text, Flex, Spacer, Image, Center, Button, InputRightElement, InputGroup, background } from "@chakra-ui/react";
import { useState } from "react";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../CommonStyles";

interface PasswordInputProps {
  label: string;
  passwordShowing: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, passwordShowing, setter }) => {
  return (
    <Box mb={5}>
      <Text as='b'>
        {label}
      </Text>
      <InputGroup size='md' mt={3}>
        <Input
          pr='4.5rem'
          type={{ passwordShowing } ? 'text' : 'password'}
          placeholder={`Enter ${label.toLowerCase()}`}
          backgroundColor={PRIMARY_COLOR}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={() => { setter(!passwordShowing) }} >
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

  return (
    <Box border={'1px solid white'} borderRadius={5} p={5} w={'70%'} backgroundColor={SECONDARY_COLOR}>
      <Box marginBottom={10}>
        <Text as='b' fontSize={25}>
          Change Password
        </Text>
      </Box>
      <PasswordInput
        label='Current password'
        passwordShowing={currentPasswordVisible}
        setter={setConfirmPasswordVisible}
      />
      <PasswordInput
        label='New password'
        passwordShowing={newPasswordVisible}
        setter={setNewPasswordVisible}
      />
      <PasswordInput
        label='Confirm password'
        passwordShowing={confirmPasswordVisible}
        setter={setConfirmPasswordVisible}
      />

    </Box >
  );
}

export default UserSecurity;