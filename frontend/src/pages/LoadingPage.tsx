import { Spinner, Text } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Spinner
        thickness='12px'
        speed='1.5s'
        color='blue.500'
        boxSize={50}
      />
      <Text as='strong' fontSize={25} padding={10}>Loading...</Text>
    </div>
  );
}

export default LoadingPage;
