import { Input, Box, Text, Flex, Spacer, Image, Center, Button, InputRightElement, InputGroup, background, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserRequestHandler from "../../handlers/UserRequestHandler";
import LocalStorageHandler from "../../handlers/LocalStorageHandler";
import { showError, showSuccess } from "../../Util";
import { useNavigate } from "react-router-dom";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../commonStyles";

interface PasswordInputProps {
  label: string;
  passwordShowing: boolean;
  hiddenSetter: React.Dispatch<React.SetStateAction<boolean>>;
  valueSetter: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const PasswordInput: React.FC<PasswordInputProps> =
  ({ label, passwordShowing, hiddenSetter, valueSetter, value }) => {
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
            value={value}
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
  const [deleteInput, setDeleteInput] = useState('');
  const userRequestHandler = new UserRequestHandler();
  const toast = useToast();
  const navigate = useNavigate();

  function resetFields() {
    setCurrentPasswordVisible(false);
    setNewPasswordVisible(false);
    setConfirmPasswordVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  function changePasswordHandler() {
    if (newPassword.length === 0) {
      showError('New password cannot be empty!', toast);
      return;
    }
    if (newPassword !== confirmPassword) {
      showError('New password and confirm password do not match', toast);
      return;
    }
    userRequestHandler.updatePassword(LocalStorageHandler.getUserData()!.username, currentPassword, newPassword)
      .then(
        () => {
          showSuccess('Password Updated', toast);
          resetFields();
        }
      ).catch((e) => {
        showError((e as Error).message, toast);
      });
  }

  function deleteHandler() {
    if (deleteInput !== 'DELETE') {
      showError(`Please enter 'DELETE' to delete your account`, toast);
      return;
    }
    userRequestHandler.deleteUser(LocalStorageHandler.getUserData()!.username)
      .then(() => {
        showSuccess('Account deleted!', toast); // TO DEDICATE A PAGE FOR ACCOUN DELETION
        navigate('..');
      }
      ).catch((e) =>
        showError((e as Error).message, toast)
      )
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
          value={currentPassword}
        />
        <PasswordInput
          label='New password'
          passwordShowing={newPasswordVisible}
          hiddenSetter={setNewPasswordVisible}
          valueSetter={setNewPassword}
          value={newPassword}
        />
        <PasswordInput
          label='Confirm password'
          passwordShowing={confirmPasswordVisible}
          hiddenSetter={setConfirmPasswordVisible}
          valueSetter={setConfirmPassword}
          value={confirmPassword}
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
            <Input onChange={(e) => { setDeleteInput(e.target.value) }}></Input>
          </Center>
          <Button
            colorScheme={'red'}
            float={'right'}
            marginTop={5}
            onClick={deleteHandler}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default UserSecurity;