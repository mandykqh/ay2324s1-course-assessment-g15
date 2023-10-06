//Can implement further logic here if needed e.g. redirect to login page after x amount of time

import { Spinner } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

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
        speed='1s'
        color='blue.500'
        boxSize={200}
      />
      <Text as='strong' fontSize={25} padding={10}>Loading...</Text>
    </div>
  );
}


export default LoadingPage;