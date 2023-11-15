import React, { useState } from "react";
import { Input, Box, Text, Flex, Spacer, Image, Center, Button, useToast } from "@chakra-ui/react";
import UserRequestHandler from "../../../handlers/UserRequestHandler";
import LocalStorageHandler from "../../../handlers/LocalStorageHandler";
import { showSuccess, showError } from "../../../Util";
import { UserDataString } from "../../../Commons";
import { selectorStyles } from "../../../CommonStyles";

const ValueLabel = ({ value }: { value: string }) => {
  return (
    <Input
      isReadOnly border={'none'}
      value={value}
      padding={3}
      bg='primary.blue1'
      color='grey'
      border='2px solid #244153'
      borderRadius='10px'
      mr='15px'
    />

  );
}

const EditiableInput = ({ value, setter }:
  { value: string, setter: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <Input
      value={value}
      bg='primary.blue1'
      border='2px solid #244153'
      onChange={(e) => setter(e.target.value)}
      padding={3}
      borderRadius='10px'
      sx={{
        _hover: {
          borderColor: 'white',
        }
      }}
    />
  );
}

const Label = ({ value }: { value: string }) => {
  return (
    <Box mb={3} mt={10}>
      <Text as='b' padding={3}>
        {value}
      </Text>
    </Box>
  );
}

const EditButton = ({ isEditing, setter }:
  {
    isEditing: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
  return (
    <Center width={5} cursor={'pointer'} onClick={() => setter(true)}>
      {isEditing ? null : <Image src='src\assets\images\edit.png' />}
    </Center>
  );
}

const UserPersonalInfo = ({ user }: { user: UserDataString }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [name, setName] = useState(LocalStorageHandler.getUserData()!.username);
  const [email, setEmail] = useState(LocalStorageHandler.getUserData()!.email);
  const toast = useToast();
  const [currentName, setCurrentName] = useState(LocalStorageHandler.getUserData()!.username);

  function resetFields() {
    setIsEditingEmail(false);
    setIsEditingName(false);
  }

  function handleSave() {
    const userData = LocalStorageHandler.getUserData()!;
    const newData = {
      id: userData.id,
      username: name,
      email: email,
      role: userData.role
    }

    UserRequestHandler.updatePersonalInfo(newData, currentName).then(() => {
      LocalStorageHandler.storeUserData(newData);
      setCurrentName(name);
      resetFields();
      showSuccess('Updated successfully', toast);
    }
    ).catch((e) => showError(e.response.data.message, toast));
  }

  return (
    <Box
      border={'2px solid #244153'}
      borderRadius={15}
      p={5}
      width={'40vw'}
      bg='primary.blue3'
    >
      <Text as='b' fontSize={25} color='primary.blue4'>Personal Information</Text>
      <Box>
        <Label value={'Name'} />
        <Flex>
          {isEditingName ? <EditiableInput value={name} setter={setName} /> : <ValueLabel value={name} />}
          <Spacer />
          <EditButton isEditing={isEditingName} setter={setIsEditingName} />
        </Flex>
        <Label value={'Email'} />
        <Flex>
          {isEditingEmail ? <EditiableInput value={email} setter={setEmail} /> : <ValueLabel value={email} />}
          <Spacer />
          <EditButton isEditing={isEditingEmail} setter={setIsEditingEmail} />
        </Flex>
      </Box>
      <Button
        colorScheme={'blue'}
        float={'right'}
        marginTop={10}
        isDisabled={!(isEditingEmail || isEditingName)}
        onClick={handleSave}
      >
        Save
      </Button>
    </Box >

  );
};

export default UserPersonalInfo;
