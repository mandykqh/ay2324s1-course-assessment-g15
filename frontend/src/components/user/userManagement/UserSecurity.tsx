import { Input, Box, Text, Flex, Spacer, Image, Center, Button, InputRightElement, InputGroup, background, useToast } from "@chakra-ui/react";
import { useState } from "react";
import UserRequestHandler from "../../../handlers/UserRequestHandler";
import LocalStorageHandler from "../../../handlers/LocalStorageHandler";
import { showError, showSuccess } from "../../../Util";
import { useNavigate } from "react-router-dom";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../CommonStyles";
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
    UserRequestHandler.updatePassword(LocalStorageHandler.getUserData()!.username, currentPassword, newPassword)
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
    const username = LocalStorageHandler.getUserData()!.username;
    UserRequestHandler.deleteUser(username)
      .then(() => {
        showSuccess('Account deleted!', toast); // TO DEDICATE A PAGE FOR ACCOUN DELETION
        AuthRequestHandler.signout(username);
        LocalStorageHandler.clearUserData();
        navigate('/');
      }
      ).catch((e) =>
        showError((e as Error).message, toast)
      )
  }

  return (
    <Center flexDirection={'column'} w={'100rem'} pt={100} pb={100}>
      <Box borderRadius={15} p={5} w={'60%'} bg='primary.blue3'
        border='2px solid #244153'>
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
          onClick={changePasswordHandler}
        >
          Save
        </Button>
      </Box >

      <Box borderRadius={15} p={5} w={'60%'} bg='primary.blue3' mt={10} border='2px solid #244153'>
        <Box marginBottom={10} >
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
            <Input bg='primary.blue1'
              border='2px solid #244153' borderRadius={15} onChange={(e) => { setDeleteInput(e.target.value) }}></Input>
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