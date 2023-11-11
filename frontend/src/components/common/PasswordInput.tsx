import { InputGroup, Input, InputRightElement, Button, Box, Text } from "@chakra-ui/react";
import { PRIMARY_COLOR } from "../../CommonStyles";

interface PasswordInputProps {
  label: string;
  passwordShowing: boolean;
  hiddenSetter: React.Dispatch<React.SetStateAction<boolean>>;
  valueSetter: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

const PasswordInput: React.FC<PasswordInputProps> =
  ({ label, passwordShowing, hiddenSetter, valueSetter, value }) => {
    return (
      <Box mb={5}>
        <Text as='b'>
          {label}
        </Text>
        <InputGroup size='md' mt={2}>
          <Input
            pr='4.5rem'
            type={passwordShowing ? 'text' : 'password'}
            placeholder={`Enter ${label.toLowerCase()}`}
            onChange={(e) => valueSetter(e.target.value)}
            value={value}
            borderRadius={15}
            bg='primary.blue3'
            border='2px solid #244153'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' borderRadius={10} onClick={() => { hiddenSetter(!passwordShowing) }} >
              {passwordShowing ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    );
  }

export default PasswordInput;