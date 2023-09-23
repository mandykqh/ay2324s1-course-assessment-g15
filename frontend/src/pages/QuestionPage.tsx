import { mockQuestions } from '../MockData';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import { NotificationOptions, QuestionString, questionStringTemplate } from '../Commons';
import { useEffect, useState } from 'react';
import QuestionValidator from '../models/QuestionValidator';
import QuestionStringBuilder from '../models/QuestionStringBuilder';
import { useToast, Center } from '@chakra-ui/react';
import { NewQuestionContext } from '../contexts/NewQuestionContext';
import QuestionDetailsModal from '../components/question/descriptionModal/QuestionDetailsModal';
import AddQuestionModal from '../components/question/addModal/AddQuestionModal';
import QuestionTable from '../components/question/QuestionTable';
import { notificationHook } from '../hooks/notificationHook';
import NavigationBar from '../components/NavigationBar';

let currentQuestion = questionStringTemplate;

const QuestionPage = () => {

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [newQuestion, setNewQuestion] = useState<QuestionString>(questionStringTemplate);
  const ctxValue = { questionData: newQuestion, setQuestionData: setNewQuestion };
  const toast = useToast();

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
      setNotificationOptions({ message: 'Question added!', type: 'success' });
      setNewQuestion(questionStringTemplate);
    } catch (e) {
      let result = (e as Error).message;
      setNotificationOptions({ message: result, type: 'error' });
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

  const [notifcationOptions, setNotificationOptions] = useState<NotificationOptions>({ message: '', type: 'success' });
  notificationHook(notifcationOptions, toast);

  return (
    <NewQuestionContext.Provider value={ctxValue}>
      <Center>
        <NavigationBar mb={5} />
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
            setNotificationOptions({ message: 'Question deleted!', type: 'success' });
          }}
        />
        <QuestionTable
          data={questions}
          viewDescriptionHandler={viewDescriptionHandler}
          addBtnOnClick={() => setAddModalIsVisible(true)}
        />
      </Center>
    </NewQuestionContext.Provider>
  )
};

export default QuestionPage;
