import { Center, Heading, Box, Text, Image } from "@chakra-ui/react";

const WelcomeLogo = () => {
  return (
    <Box w='100%' className="welcome">
      <Center>
        <Center flexDirection={'column'}>
          <Image src="src\assets\welcome-logo1.svg" />
          <Image src="src\assets\peerprep-keycaps.svg" mt={5} />
        </Center>
      </Center>
    </Box>
  );
}

export default WelcomeLogo;