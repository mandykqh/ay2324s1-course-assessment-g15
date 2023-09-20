import './QuestionPage.css';
import { mockQuestions } from '../MockData';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import { QuestionString } from '../Commons';
import React, { useEffect, useState } from 'react';
import AddQuestionModal from '../components/question/addModal/AddQuestionModal';
import DescriptionModal from '../components/question/descriptionModal/DescriptionModal';
import QuestionTable from '../components/question/QuestionTable';
import { Notification, NotificationType } from '../components/question/Notification';
import QuestionValidator from '../models/QuestionValidator';
import { questionStringTemplate } from '../Commons';
import QuestionStringBuilder from '../models/QuestionStringBuilder';

// Initializes with all fields empty
let currentQuestion = questionStringTemplate;

const QuestionPage = () => {

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [newQuestionData, setNewQuestionData] = useState<QuestionString>(questionStringTemplate);
  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [isDeleting, setIsDeleting] = useState(false);
  const [notifIsVisible, setNotifIsVisible] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState<NotificationType>(NotificationType.SUCCESS);

  function showNotification(message: string, type: NotificationType) {
    setNotifIsVisible(true);
    setNotifMessage(message);
    setNotifType(type);
  }

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

  function submitHandler() {
    let builder = new QuestionStringBuilder();
    builder.setQuestionString(newQuestionData);
    try {
      let newQuestion = builder.build();
      let newArr = [...questions, newQuestion];
      checkDuplicates(newQuestion, questions);
      setQuestions(newArr);
      setAddModalIsVisible(false);
      LocalStorageHandler.saveQuestion(newArr);
      LocalStorageHandler.advanceQuestionId();
      showNotification('Question added', NotificationType.SUCCESS);
    } catch (e) {
      let result = (e as Error).message;
      showNotification(result, NotificationType.ERROR);
    }
  }

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
    <div id='question-page-container'>
      {/* <Notification
        isOpen={notifIsVisible}
        setter={setNotifIsVisible}
        message={notifMessage}
        type={notifType}
      /> */}
      {/* <AddQuestionModal
        isVisible={addModalIsVisible}
        closeHandler={() => setAddModalIsVisible(false)}
        newQuestionSetter={setNewQuestionData}
        submitHandler={submitHandler}
      /> */}

      <DescriptionModal
        isVisible={viewModalIsVisible}
        data={currentQuestion}
        closeHandler={() => { setViewModalIsVisible(false); }}
      />
      <QuestionTable
        data={questions}
        viewDescriptionHandler={viewDescriptionHandler}
        deleteHandler={(id: string) => {
          setQuestions(questions.filter(i => i.id !== id));
          LocalStorageHandler.saveQuestion(questions.filter(i => i.id !== id));
        }}
        isDeleting={isDeleting}
        addBtnOnClick={() => setAddModalIsVisible(true)}
        deleteBtnOnClick={() => setIsDeleting(!isDeleting)}
      />


    </div>
  )
};

export default QuestionPage;