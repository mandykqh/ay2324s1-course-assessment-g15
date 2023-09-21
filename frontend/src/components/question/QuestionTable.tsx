import './QuestionTable.css';
import { useState, useEffect } from "react";
import Question from '../../models/question/Question';
import { QuestionString } from '../../Commons';
import ManageQuestionsButtonRow from './ManageQuestionsButtonRow';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

interface Props {
  data: QuestionString[]
  viewDescriptionHandler: (id: string) => void;
  addBtnOnClick: () => void;
}

const QuestionTable: React.FC<Props> =
  ({ data, viewDescriptionHandler, addBtnOnClick }) => {
    const [questionsList, setQuestionsList] = useState<Question[]>([]);

    // Hook to update questionsList
    useEffect(() => {
      const qnArr = data.map((i: QuestionString) =>
        new Question(parseInt(i.id), i.title, i.categories,
          i.complexity, i.link, i.description));
      setQuestionsList(qnArr);
    }, [data])

    return (
      <TableContainer>
        <ManageQuestionsButtonRow
          addHandler={addBtnOnClick}
        />
        <Table variant='simple' className='question-table' width={'70vw'}>
          <Thead>
            <Tr>
              <Th className='question-th'>Id</Th>
              <Th className='question-th'>Title</Th>
              <Th className='question-th'>Category</Th>
              <Th className='question-th'>Complexity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questionsList.map((qn: Question, key: number) => {
              return (
                <Tr
                  key={key}
                  className='question-tr'
                  onClick={() => { viewDescriptionHandler(qn.id.toString()) }}>
                  <Td className='question-td'>{qn.id.toString()}</Td>
                  <Td className='question-td'>{qn.title}</Td>
                  <Td className='question-td'>{qn.getCategoriesString()}</Td>
                  <Td className='question-td'>{qn.getComplexityString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer >
    );
  }

export default QuestionTable;
