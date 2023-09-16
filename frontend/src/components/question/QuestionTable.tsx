import './QuestionTable.css';
import { useState, useEffect } from "react";
import Question from '../../models/Question';
import { QuestionString } from '../../Commons';
import ManageQuestionsButtonRow from '../ManageQuestionsButtonRow';

interface Props {
  data: QuestionString[]
  isDeleting: boolean
  viewDescriptionHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
  addBtnOnClick: () => void;
  deleteBtnOnClick: () => void;
}

const headerCell = (label: string) => {
  return <th className="question-th">{label}</th>
}

const bodyCell = (value: string) => {
  return <td className="question-td">{value}</td>
}

const QuestionTable: React.FC<Props> =
  ({ data, viewDescriptionHandler, isDeleting, deleteHandler,
    deleteBtnOnClick, addBtnOnClick }) => {
    const [questionsList, setQuestionsList] = useState<Question[]>([]);

    // Hook to update questionsList
    useEffect(() => {
      const qnArr = data.map((i: QuestionString) =>
        new Question(parseInt(i.id), i.title, i.categories,
          i.complexity, i.link, i.description));
      setQuestionsList(qnArr);
    }, [data])

    return (
      <div id='question-table-container'>
        <ManageQuestionsButtonRow
          addHandler={addBtnOnClick}
          deleteHandler={deleteBtnOnClick}
        />
        <table className='question-table'>
          <tbody>
            <tr>
              {headerCell("Id")}
              {headerCell("Title")}
              {headerCell("Category")}
              {headerCell("Complexity")}
              {headerCell("Link")}
            </tr>
            {questionsList.map((qn: Question, key: number) => {
              return (
                <tr
                  className={isDeleting ? "question-tr-deleting" : 'question-tr-viewing'}
                  key={qn.id.toString()}
                  onClick={
                    (e) => {
                      if (isDeleting) {
                        deleteHandler(qn.id.toString());
                      } else {
                        viewDescriptionHandler(qn.id.toString())
                      }
                    }
                  }>
                  {bodyCell(qn.id.toString())}
                  {bodyCell(qn.title)}
                  {bodyCell(qn.getCategoriesString())}
                  {bodyCell(qn.getComplexityString())}
                  {bodyCell(qn.link)}
                </tr>
              );
            })}
          </tbody>
        </table >
      </div>
    );
  }

export default QuestionTable;
