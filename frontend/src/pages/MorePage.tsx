import { Box, Center, Text } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";

const MorePage = () => {
  return (
    <Box>
      <NavigationBar index={2} />
      <Center height='100vh'>
        <Text>
          More Page coming soon....
        </Text>
      </Center>
    </Box>
  );
}

export default MorePage;