import './QuestionPage.css';
import { mockQuestions } from '../MockData';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import { QuestionString } from '../Commons';
import React, { useEffect, useState } from 'react';
import AddQuestionModal from '../components/question/addModal/AddQuestionModal';
import QuestionTable from '../components/question/QuestionTable';
import QuestionValidator from '../models/QuestionValidator';
import { questionStringTemplate } from '../Commons';
import QuestionStringBuilder from '../models/QuestionStringBuilder';
import { Input, useToast } from '@chakra-ui/react';
import { NewQuestionContext } from '../contexts/NewQuestionContext';
import QuestionDetailsModal from '../components/question/descriptionModal/QuestionDetailsModal';

// Initializes with all fields empty
let currentQuestion = questionStringTemplate;

const QuestionPage = () => {

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [newQuestion, setNewQuestion] = useState<QuestionString>(questionStringTemplate);
  const ctxValue = { questionData: newQuestion, setQuestionData: setNewQuestion };

  // TO REMOVE AFTER ASSIGNMENT 1 -----------------------------------------
  function checkDuplicates(qn: QuestionString, qnList: QuestionString[]) {
    try {
      let validator = new QuestionValidator();
      validator.validateDuplicateQuestions(qn, qnList);
    } catch (e) {
      throw (e);
    }
  }
  // -------------------------------------------------------------------------


  // TEMP FUNCTION FOR ASSIGNMENT 1: so idw tidy up :] ===============================
  function submitHandler() {
    let builder = new QuestionStringBuilder();
    builder.setQuestionString(newQuestion);
    try {
      let newQuestion = builder.build();
      let newArr = [...questions, newQuestion];
      checkDuplicates(newQuestion, questions);
      setQuestions(newArr);
      setAddModalIsVisible(false);
      LocalStorageHandler.saveQuestion(newArr);
      LocalStorageHandler.advanceQuestionId();
    } catch (e) {
      let result = (e as Error).message;
    }
  }
  // ===============================================================================

  useEffect(() => {
    if (Object.keys(LocalStorageHandler.loadQuestion()).length === 0) {
      setQuestions(mockQuestions);
      return;
    }
    setQuestions(LocalStorageHandler.loadQuestion());
  }, []);

  function viewDescriptionHandler(id: string) {
    setCurrentQuestionId(id);
    setViewModalIsVisible(true);
  }

  const selectedQuestion = questions.filter(i => i.id === currentQuestionId)[0];
  if (selectedQuestion !== undefined) {
    currentQuestion = selectedQuestion;
  }

  return (
    <NewQuestionContext.Provider value={ctxValue}>
      <div id='question-page-container'>
        <AddQuestionModal
          isVisible={addModalIsVisible}
          closeHandler={() => setAddModalIsVisible(false)}
          submitHandler={submitHandler}
        />
        <QuestionDetailsModal
          isVisible={viewModalIsVisible}
          data={currentQuestion}
          closeHandler={() => { setViewModalIsVisible(false); }}
          deleteHandler={(id: string) => {
            setQuestions(questions.filter(i => i.id !== id));
            LocalStorageHandler.saveQuestion(questions.filter(i => i.id !== id));
            setViewModalIsVisible(false);
          }}
        />
        <QuestionTable
          data={questions}
          viewDescriptionHandler={viewDescriptionHandler}
          addBtnOnClick={() => setAddModalIsVisible(true)}
        />
      </div>
    </NewQuestionContext.Provider>
  )
};

export default QuestionPage;
