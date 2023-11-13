import {
  Box,
  Flex,
  Text,
  Center,
  Tab,
  TabList,
  Tabs,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast
} from "@chakra-ui/react";
import { SECONDARY_COLOR } from "../CommonStyles";
import { useNavigate } from "react-router-dom";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import { showError } from "../Util";

const HEIGHT = 50;

interface Props {
  index: number;
}

const NavigationBar: React.FC<Props> = ({ index }) => {
  const navigate = useNavigate();
  const toast = useToast();

  function signoutHandler() {
    AuthRequestHandler.signout(LocalStorageHandler.getUserData()!.username)
      .then(() => {
        LocalStorageHandler.clearAll();
        navigate('..');
      })
      .catch((e) => {
        showError((e as Error).message, toast);
      });
  }

  function renderTabs() {
    const tabHeadings = [
      {
        label: 'Questions',
        onClick: () => { navigate('../home') }
      }, {
        label: 'Collaborate',
        onClick: () => { navigate('../collaborate') }
      }
    ]

    return (
      <Tabs variant={'line'} index={index}>
        <TabList>
          {tabHeadings.map(h =>
            <Tab color='primary.green'
              textStyle='h1'
              key={h.label} onClick={h.onClick}>{h.label}
            </Tab>)}
        </TabList>
      </Tabs>
    );
  }

  function renderTitleText() {
    return (
      <HStack>
        <Box onClick={() => navigate('../home')} cursor={'pointer'}>
          <Image h={30} src='/src/assets/logo.svg' />
        </Box>
        <Box onClick={() => navigate('../home')} cursor={'pointer'}>
          <Text as='b' color='primary.green' fontSize={25} mr={50}>PeerPrep</Text>
        </Box>
      </HStack>
    );
  }

  function renderMenu() {
    return (
      <Menu>
        <MenuButton>
          <Center h={HEIGHT} mr={50} cursor={'pointer'}>
            {LocalStorageHandler.getUserData()?.role === 'ADMIN' && (
              <>
                <Tag mx='15px' colorScheme="cyan">Administrator</Tag>
                <Divider orientation="vertical" />
              </>
            )}
            <Text textStyle='h1' px='15px'>{LocalStorageHandler.getUserData()?.username}</Text>
            <Image h={30} src='/src/assets/images/user.png' />
          </Center>
        </MenuButton>
        <MenuList bg='primary.blue2' border='2px solid #244153'>
          <MenuItem bg='primary.blue2' _hover={{ bg: 'primary.blue3', color: 'white' }} onClick={() => navigate('../profile')}>Your profile</MenuItem>
          <MenuItem bg='primary.blue2' _hover={{ bg: 'primary.blue3', color: 'white' }} onClick={signoutHandler}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Box w={'100%'} h={HEIGHT} backgroundColor={SECONDARY_COLOR} position={'absolute'}>
      <Flex>
        <Center h={HEIGHT} ml={150}>
          {renderTitleText()}
          {renderTabs()}
        </Center>
        <Spacer />
        {renderMenu()}
      </Flex >
    </Box >
  );
}

export default NavigationBar;
