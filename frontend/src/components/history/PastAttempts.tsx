import { Table, Thead, Td, Tbody, Tr, Th, Card, List, ListItem, Text, Spacer, Flex, Box } from '@chakra-ui/react'
import { Attempt } from '../../Commons';

const AttemptEntry = ({ title, date }: { title: string, date: string }) => {
  return (
    <Tr>
      <Td >{title}</Td>
      <Td isNumeric>{date}</Td>
    </Tr>
  );
}

const PastAttempts = ({ attempts }: { attempts: Attempt[] }) => {
  return (
    <Box border="1.5px solid #244153" overflow="hidden" borderRadius="xl" width={'520px'}>
      <Table variant="simple" borderRadius="full" width={'520px'}>
        <Thead bg='primary.blue2'>
          <Tr >
            <Th color='primary.green' borderTopLeftRadius={15}>Question Title</Th>
            <Th color='primary.green' isNumeric borderTopRightRadius={15}>Date Attempted</Th>
          </Tr>
        </Thead>
        <Tbody bg='primary.blue3'>
          {attempts.map((entry, index) => (
            <AttemptEntry key={index} title={entry.questionId} date={entry.timestamp.substring(0, 10)} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default PastAttempts;