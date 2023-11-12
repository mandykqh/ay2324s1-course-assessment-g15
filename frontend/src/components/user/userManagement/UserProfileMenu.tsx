import { Text, Box, Center, Image, Flex } from "@chakra-ui/react";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../CommonStyles";

interface MenuItemProps {
  label: string;
  imageUrl: string;
  onClick: () => void;
  index: number
  selectedIndex: number
}

const MenuItem: React.FC<MenuItemProps> = ({ label, imageUrl, index, selectedIndex, onClick }) => {
  let backgroundColor = index === selectedIndex ? SECONDARY_COLOR : PRIMARY_COLOR;
  return (
    <Box
      p={3}
      style={{
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Flex marginLeft={5}>
        <Center>
          <Center width={7} marginRight={3}>
            <Image src={imageUrl} />
          </Center>
          <Text fontSize='15'>
            {label}
          </Text>
        </Center>
      </Flex>
    </Box >
  );
}

interface MenuProps {
  currentMenuIndex: number;
  setCurrentMenuIndex: React.Dispatch<React.SetStateAction<number>>;
}

const UserProfileMenu: React.FC<MenuProps> =
  ({ currentMenuIndex, setCurrentMenuIndex }) => {
    return (
      <Box width='20vw' height={'100vh'} pb={10} pt={10} mt={10}>

        <MenuItem
          index={1}
          selectedIndex={currentMenuIndex}
          label='Personal Information'
          imageUrl='src\assets\images\personal_info.png'
          onClick={() => { setCurrentMenuIndex(1) }} />
        <MenuItem
          index={2}
          selectedIndex={currentMenuIndex}
          label='Security'
          imageUrl='src\assets\images\security.png'
          onClick={() => { setCurrentMenuIndex(2) }} />

      </Box>
    );
  }

export default UserProfileMenu;