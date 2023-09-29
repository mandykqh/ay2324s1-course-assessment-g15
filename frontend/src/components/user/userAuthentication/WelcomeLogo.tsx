import { Center, Heading, Box, Text, Image } from "@chakra-ui/react";

const WelcomeLogo = () => {
  return (
    <Box w='100%' className="welcome">
      <Center>
        <Center flexDirection={'column'}>
          <Heading className='welcome-text'>
            <Text
              color={'#F1DB65'}
              fontSize={55}
              fontStyle={'normal'}
              fontWeight={600}
              lineHeight={'normal'}
              display={'inline'}>
              {'{'}
            </Text>
            <Text
              display='inline'
              fontSize={45}
              fontWeight={700}>
              Welcome to
            </Text>
            <br />
            <Text
              fontSize={55}
              color={'#6dd7c4'}
              fontWeight={700}
              lineHeight={'normal'}
              display={'inline'}>
              PeerPrep
            </Text>
            <Text
              color={'#F1DB65'}
              fontSize={55}
              fontStyle={'normal'}
              fontWeight={600}
              lineHeight={'normal'}
              display={'inline'}>
              {'}'}
            </Text>
          </Heading>
          <Image src="src\assets\peerprep-keycaps.svg" mt={5} />
        </Center>
      </Center>
    </Box>
  );
}

export default WelcomeLogo;