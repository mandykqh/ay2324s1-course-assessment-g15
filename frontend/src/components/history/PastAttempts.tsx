import { Card, CardBody, List, ListItem, Text, Spacer, Flex, Box } from '@chakra-ui/react'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../commonStyles';

const dummyData = [
  { title: 'Question_1', date: `10/10/2023` },
  { title: 'Question_3', date: `8/10/2023` },
  { title: 'Question_2', date: `9/10/2023` },
];

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


const PastAttempts = () => {
  return (
    <List width={600}>
      <ListItem bg={SECONDARY_COLOR} p={3} border={"1px solid #999"}>
        <Flex>
          <Text fontWeight={'bold'}>Question Title</Text>
          <Spacer />
          <Text fontWeight={'bold'}>Date Attempted</Text>
        </Flex>
      </ListItem>
      {dummyData.map((entry) =>
        <ListItem key={entry.title}><AttemptEntry title={entry.title} date={entry.date} /></ListItem>
      )}
    </List>
  );
}

export default PastAttempts;