import { useState, useEffect } from "react";
import Question from '../../models/question/Question';
import { QuestionString } from '../../commons';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Box } from '@chakra-ui/react';

const QuestionTd = ({ value }: { value: string }) => {
  return (
    <Td
      border='1px solid #9999'
      maxW='200px'
      textOverflow='ellipsis'
      overflowX='hidden'
    >{value}</Td>
  );
}

interface Props {
  data: QuestionString[]
  viewDescriptionHandler: (id: string) => void;
  addBtnOnClick: () => void;
}

const QuestionTable: React.FC<Props> =
  ({ data, viewDescriptionHandler, addBtnOnClick }) => {
    const [questionsList, setQuestionsList] = useState<Question[]>([]);
    const headings = ['Id', 'Title', 'Category', 'Complexity'];
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
      <TableContainer>
        <Box>
          <Button colorScheme='blue' onClick={addBtnOnClick} m={5} float='right'>
            Add
          </Button>
        </Box>
        <Table variant='simple' className='question-table' width={'70vw'}>
          <Thead>
            <Tr>
              {headings.map((label) =>
                <Th bgColor='#212224' border='1px solid #999999' key={label}>
                  {label}
                </Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {questionsList.map((qn: Question, key: number) => {
              return (
                <Tr
                  key={key}
                  onClick={() => { viewDescriptionHandler(qn.id.toString()) }}
                  _hover={{ backgroundColor: '#212224', cursor: 'pointer' }}
                >
                  <QuestionTd value={qn.id.toString()} />
                  <QuestionTd value={qn.title} />
                  <QuestionTd value={qn.getCategoriesString()} />
                  <QuestionTd value={qn.getComplexityString()} />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer >
    );
  }

export default QuestionTable;
