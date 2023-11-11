import { Card, List, ListItem, Text, Spacer, Flex } from '@chakra-ui/react'
import { SECONDARY_COLOR } from '../../CommonStyles';
import { Attempt } from '../../Commons';

const AttemptEntry = ({ title, date }: { title: string, date: string }) => {
  return (
    <Card
      borderRadius={0}
      border={'1px solid #999'}
      mb={-1}
      p={3}
      direction={{ base: 'column', sm: 'row' }}
      width={'100%'}>
      <Text>{title}</Text>
      <Spacer />
      <Text color={'#BBBBBB'} fontSize={13}>{date}</Text>
    </Card>
  );
}

const PastAttempts = ({ attempts }: { attempts: Attempt[] }) => {
  return (
    <List width={600}>
      <ListItem bg={SECONDARY_COLOR} p={3} border={"1px solid #999"}>
        <Flex>
          <Text fontWeight={'bold'}>Question Title</Text>
          <Spacer />
          <Text fontWeight={'bold'}>Date Attempted</Text>
        </Flex>
      </ListItem>
      {attempts.map((entry, index) =>
        <ListItem key={index}>
          <AttemptEntry title={entry.questionId} date={entry.timestamp.substring(0, 10)} />
        </ListItem>
      )}
    </List>
  );
}

export default PastAttempts;