import { useState, useEffect } from "react";
import Question from '../../models/question/Question';
import { QuestionString } from '../../Commons';
import { Center, Text, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Box } from '@chakra-ui/react';
import LocalStorageHandler from "../../handlers/LocalStorageHandler";
import ComplexityTag from "./ComplexityTag";

const QuestionTd = ({ value }: { value: string }) => {
  return (
    <Td
      border='none'
      maxW='200px'
      textOverflow='ellipsis'
      overflowX='hidden'
    >{value}</Td>
  );
}

interface Props {
  data: QuestionString[]
  viewDescriptionHandler: (id: string) => void;
}

const QuestionTable: React.FC<Props> =
  ({ data, viewDescriptionHandler }) => {
    const [questionsList, setQuestionsList] = useState<Question[]>([]);
    const headings = ['Id', 'Title', 'Category', 'Complexity'];
    // const userData = LocalStorageHandler.getUserData();
    // const userRole = userData ? userData.role : null;

    // Hook to update questionsList
    useEffect(() => {
      if (data.length === 0) {
        return;
      }
      const qnArr = data.map((i: QuestionString) =>
        new Question(parseInt(i.id), i.title, i.categories,
          i.complexity, i.link, i.description));
      setQuestionsList(qnArr);
    }, [data])


    return (
      <TableContainer mb='40px' height="calc(100vh - 190px)" overflowY="scroll">
        <Box border="1.5px solid #244153" borderRadius="xl" overflow="hidden">
          <Table variant='simple' borderRadius="full" className='question-table' width={'50vw'}>
            <Thead>
              <Tr>
                {headings.map((label) =>
                  <Th bgColor='primary.blue2'
                    color='primary.green'
                    border='none'
                    key={label}>
                    <Text >{label}</Text>
                  </Th>)}
              </Tr>
            </Thead>
            <Tbody>
              {questionsList.map((qn: Question, key: number) => {
                const isEvenRow = key % 2 === 0;
                const rowBackground = isEvenRow ? '#0B1825' : '#0F2031';
                return (
                  <Tr
                    key={key}
                    onClick={() => { viewDescriptionHandler(qn.id.toString()) }}
                    _hover={{ backgroundColor: '#040B11', cursor: 'pointer' }}
                    bg={rowBackground}
                    h='60px'
                  >
                    <QuestionTd value={qn.id.toString()} />
                    <QuestionTd value={qn.title} />
                    <QuestionTd value={qn.getCategoriesString()} textWrap={true} />
                    <Center pt='18px'>
                      <ComplexityTag complexity={qn.getComplexityString()} />
                    </Center>

                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </TableContainer >
    );
  }

export default QuestionTable;
