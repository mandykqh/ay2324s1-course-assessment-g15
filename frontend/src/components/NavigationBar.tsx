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
          {tabHeadings.map(h => <Tab key={h.label} onClick={h.onClick}>{h.label}</Tab>)}
        </TabList>
      </Tabs>
    );
  }

  function renderTitleText() {
    return (
      <Box onClick={() => navigate('../home')} cursor={'pointer'}>
        <Text as='b' fontSize={25} mr={50}>PeerPrep</Text>
      </Box>
    );
  }

  function renderMenu() {
    return (
      <Menu>
        <MenuButton>
          <Center h={HEIGHT} mr={50} cursor={'pointer'}>
            <Image h={30} src='src\assets\images\user.png' />
          </Center>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => navigate('../profile')}>Edit profile</MenuItem>
          <MenuItem onClick={signoutHandler}>Sign out</MenuItem>
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
