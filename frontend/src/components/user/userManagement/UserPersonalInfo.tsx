import React, { useState } from "react";
import { Input, Box, Text, Flex, Spacer, Image, Center, Button, Circle, useToast } from "@chakra-ui/react";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../CommonStyles";
import { UserDataString } from "../../../Commons";
import UserRequestHandler from "../../../handlers/UserRequestHandler";
import LocalStorageHandler from "../../../handlers/LocalStorageHandler";
import { showSuccess, showError } from "../../../Util";

const ValueLabel = ({ value }: { value: string }) => {
  return (
    <Input
      isReadOnly border={'none'}
      value={value}
      background={SECONDARY_COLOR}
      padding={3} />
  );
}

const EditiableInput = ({ value, setter }:
  { value: string, setter: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <Input
      value={value}
      background={PRIMARY_COLOR}
      onChange={(e) => setter(e.target.value)}
      padding={3}
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


// TODO: Authorization before page access
const UserPersonalInfo = ({ user }: { user: UserDataString }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [name, setName] = useState(LocalStorageHandler.getUserData()!.username);
  const [email, setEmail] = useState(LocalStorageHandler.getUserData()!.email);
  const userRequestHandler = new UserRequestHandler();
  const toast = useToast();
  const [currentName, setCurrentName] = useState(LocalStorageHandler.getUserData()!.username);

  function resetFields() {
    setIsEditingEmail(false);
    setIsEditingName(false);
  }

  function handleSave() {
    const newData = {
      id: LocalStorageHandler.getUserData()!.id,
      username: name,
      email: email
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
      border={'1px solid white'}
      borderRadius={5}
      p={5}
      width={'50%'}
      backgroundColor={SECONDARY_COLOR}
    >
      <Text as='b' fontSize={25}>Personal Info</Text>
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