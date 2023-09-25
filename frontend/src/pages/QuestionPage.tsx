import { mockQuestions } from '../MockData';
import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
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
import EditQuestionModal from '../components/question/editModal/EditQuestionModal';

let currentQuestion = questionStringTemplate;

const QuestionPage = () => {

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [newQuestion, setNewQuestion] = useState<QuestionString>(questionStringTemplate);
  const [questionToEdit, setQuestionToEdit] = useState<QuestionString | null>(null);
  const ctxValue = { questionData: newQuestion, setQuestionData: setNewQuestion };
  const toast = useToast();

  function checkDuplicates(qn: QuestionString, qnList: QuestionString[]) {
    try {
      let validator = new QuestionValidator();
      validator.validateDuplicateQuestions(qn, qnList);
    } catch (e) {
      throw (e);
    }
  }

  async function submitHandler() {
    let builder = new QuestionStringBuilder();
    builder.setQuestionString(newQuestion);
    try {
      // Locally check for duplicates before sending to backend
      let newQuestion = builder.build();
      checkDuplicates(newQuestion, questions);

      // Send to backend, get ID
      const newID = await QuestionRequestHandler.createQuestionAndGetID(newQuestion);
      const updatedQuestionStringTemplate = { ...questionStringTemplate, id: newID.toString() };

      // Set questions locally using new ID
      newQuestion.id = newID.toString();
      setQuestions([...questions, newQuestion]);
      setAddModalIsVisible(false);
      setNotificationOptions({ message: 'Question added!', type: 'success' });
      setNewQuestion(updatedQuestionStringTemplate);
    } catch (e) {
      let result = (e as Error).message;
      setNotificationOptions({ message: result, type: 'error' });
    }
  }

  function editQuestionHandler(id: string) {
    const questionToEdit = questions.find((question) => question.id === id);
    if (questionToEdit) {
      setQuestionToEdit(questionToEdit);
      setEditModalIsVisible(true);
    }
  }

  useEffect(() => {
    try {
      QuestionRequestHandler.loadQuestions().then((questions: QuestionString[]) => {
        // Temporary mock data for assignment 1 ------------------------------------------
        // if (Object.keys(questions).length === 0) {
        //   setQuestions(mockQuestions);
        //   return;
        // }
        // -------------------------------------------------------------------------------
        setQuestions(questions);
        console.log(questions);
      });
    } catch (error) {
      console.log(error);
      setNotificationOptions({ message: 'Failed to load questions!', type: 'error' });
    }
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
        <AddQuestionModal
          isVisible={addModalIsVisible}
          closeHandler={() => setAddModalIsVisible(false)}
          submitHandler={submitHandler}
        />
        <QuestionDetailsModal
          isVisible={viewModalIsVisible}
          data={currentQuestion}
          closeHandler={() => { setViewModalIsVisible(false); }}
          editHandler={ editQuestionHandler }
          deleteHandler={(id: string) => {
            try {
              QuestionRequestHandler.deleteQuestion(id);
              setNotificationOptions({ message: `Question ${id} deleted!`, type: 'success' });
              setQuestions(questions.filter(i => i.id !== id));
              setViewModalIsVisible(false);
            } catch (error) {
              setNotificationOptions({ message: `Question ${id} deletion failed!`, type: 'error' });
            }
          }}
        />
        <EditQuestionModal
          isVisible={editModalIsVisible}
          questionToEdit={questionToEdit == null ? questionStringTemplate : questionToEdit}
          closeHandler={() => setEditModalIsVisible(false)}
          updateHandler={() => {}}
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
