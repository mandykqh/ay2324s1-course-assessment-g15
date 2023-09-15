import './QuestionPage.css'
import { questionSet } from "../MockData";
import QuestionTable from "../question/QuestionTable";
import DescriptionModal from "../question/descriptionModal/DescriptionModal";
import { useEffect, useState } from 'react';
import { QuestionString } from '../models/Question';

let qn = { title: '', category: '', complexity: '', description: '' };

const QuestionPage = () => {

  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [descModalIsVisible, setDescModalIsVisible] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState('0');

  useEffect(() => { setQuestions(questionSet); }, []);


  const selectedQuestion = questions.filter(i => i.id === currentQuestionId)[0];
  if (selectedQuestion !== undefined) {
    qn.title = (selectedQuestion.title);
    qn.category = (selectedQuestion.categories);
    qn.complexity = (selectedQuestion.complexity);
    qn.description = (selectedQuestion.description);
  }

  return (
    <div id='question-page-container'>
      <DescriptionModal
        isVisible={descModalIsVisible}
        data={qn}
        closeHandler={() => { setDescModalIsVisible(false) }}
      />
      <QuestionTable
        data={questionSet}
        isDeleting={false}
        viewDescriptionHandler={(id: string) => {
          setCurrentQuestionId(id);
          setDescModalIsVisible(true)
        }}
        deleteHandler={(id: string) => { }}
      />
    </div>
  );
}

export default QuestionPage;