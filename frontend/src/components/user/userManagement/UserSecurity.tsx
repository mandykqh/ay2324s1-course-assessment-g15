import { Input, Box, Text, Flex, Spacer, Image, Center, Button, InputRightElement, InputGroup, background, useToast } from "@chakra-ui/react";
import { useState } from "react";
import UserRequestHandler from "../../../handlers/UserRequestHandler";
import LocalStorageHandler from "../../../handlers/LocalStorageHandler";
import { showError, showSuccess } from "../../../Util";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../common/PasswordInput";
import AuthRequestHandler from "../../../handlers/AuthRequestHandler";

const UserSecurity = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteInput, setDeleteInput] = useState('');
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

  function renderCurrentPasswordInput() {
    return (
      <PasswordInput
        label='Current password'
        passwordShowing={currentPasswordVisible}
        hiddenSetter={setCurrentPasswordVisible}
        valueSetter={setCurrentPassword}
        value={currentPassword}
      />
    );
  }

  function renderNewPasswordInput() {
    return (
      <PasswordInput
        label='New password'
        passwordShowing={newPasswordVisible}
        hiddenSetter={setNewPasswordVisible}
        valueSetter={setNewPassword}
        value={newPassword}
      />
    );
  }

  function renderConfirmPasswordInput() {
    return (
      <PasswordInput
        label='Confirm password'
        passwordShowing={confirmPasswordVisible}
        hiddenSetter={setConfirmPasswordVisible}
        valueSetter={setConfirmPassword}
        value={confirmPassword}
      />
    );
  }

  function renderChangePasswordButton() {
    const changePasswordHandler = () => {
      if (newPassword.length === 0) {
        showError('New password cannot be empty!', toast);
        return;
      }
      if (newPassword !== confirmPassword) {
        showError('New password and confirm password do not match', toast);
        return;
      }
      const username = LocalStorageHandler.getUserData()!.username;
      const handleSuccess = () => {
        showSuccess('Password Updated', toast);
        resetFields();
      }
      UserRequestHandler.updatePassword(username, currentPassword, newPassword)
        .then(handleSuccess)
        .catch((e) => {
          showError((e as Error).message, toast);
        });
    }

    return (
      <Button
        colorScheme={'blue'}
        float={'right'}
        marginTop={10}
        onClick={changePasswordHandler}
      >
        Save
      </Button>
    );
  }

  function renderPasswordForm() {
    return (
      <Box borderRadius={15} p={5} w={'60%'}
        bg='primary.blue3' border='2px solid #244153'>
        <Box marginBottom={10}>
          <Text as='b' fontSize={25}>
            Change Password
          </Text>
        </Box>
        {renderCurrentPasswordInput()}
        {renderNewPasswordInput()}
        {renderConfirmPasswordInput()}
        {renderChangePasswordButton()}
      </Box >
    );
  }

  function renderDeleteAccountButton() {
    function deleteHandler() {
      if (deleteInput !== 'DELETE') {
        showError(`Please enter 'DELETE' to delete your account`, toast);
        return;
      }
      const username = LocalStorageHandler.getUserData()!.username;
      UserRequestHandler.deleteUser(username)
        .then(() => {
          showSuccess('Account deleted!', toast);
          AuthRequestHandler.signout(username);
          LocalStorageHandler.clearAll();
          navigate('/');
        }
        ).catch((e) =>
          showError((e as Error).message, toast)
        )
    }

    return (
      <Button
        colorScheme={'red'}
        float={'right'}
        marginTop={5}
        onClick={deleteHandler}
      >
        Delete Account
      </Button>
    );
  }

  function renderDeleteInput() {
    return (
      <>
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
      </>
    );
  }

  function renderDeleteAccountForm() {
    return (
      <Box borderRadius={15} p={5} w={'60%'} bg='primary.blue3' mt={10} border='2px solid #244153'>
        <Box marginBottom={10}>
          <Text as='b' fontSize={25}>
            Delete Account
          </Text>
          {renderDeleteInput()}
          {renderDeleteAccountButton()}
        </Box>
      </Box>
    );
  }

  return (
    <Center flexDirection={'column'} w={'100rem'} pt={100} pb={100}>
      {renderPasswordForm()}
      {renderDeleteAccountForm()}
    </Center>
  );
}

export default UserSecurity;
