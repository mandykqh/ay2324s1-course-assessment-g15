import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import { QuestionString, emptyQuestionString, questionStringTemplate } from '../Commons';
import { useEffect, useState } from 'react';
import QuestionValidator from '../models/QuestionValidator';
import QuestionStringBuilder from '../models/QuestionStringBuilder';
import { useToast, Center } from '@chakra-ui/react';
import { NewQuestionContext } from '../contexts/NewQuestionContext';
import QuestionDetailsModal from '../components/question/descriptionModal/QuestionDetailsModal';
import AddQuestionModal from '../components/question/addModal/AddQuestionModal';
import QuestionTable from '../components/question/QuestionTable';
import EditQuestionModal from '../components/question/editModal/EditQuestionModal';

let currentQuestion = emptyQuestionString;

const QuestionPage = () => {

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [questionCache, setQuestionCache] = useState<QuestionString>(emptyQuestionString);
  const ctxValue = { questionData: questionCache, setQuestionData: setQuestionCache };

  async function submitHandler() {
    let builder = new QuestionStringBuilder();
    builder.setQuestionString(questionCache);
    try {
      // Locally check for duplicates before sending to backend
      let newQuestion = builder.build();

      // Send to backend, get ID
      const newID = await QuestionRequestHandler.createQuestionAndGetID(newQuestion);
      const updatedQuestionStringTemplate = { ...questionStringTemplate, id: newID.toString() };

      // Set questions locally using new ID
      newQuestion.id = newID.toString();
      setQuestions([...questions, newQuestion]);
      setAddModalIsVisible(false);
      console.log('Question added');
      setQuestionCache(updatedQuestionStringTemplate);
    } catch (e) {
      let result = (e as Error).message;
      console.log(result);
    }
  }

  async function submitUpdateHandler(question: QuestionString) {
    try {
      let builder = new QuestionStringBuilder()
      builder.setQuestionString(question);
      let updatedQuestion = builder.build();

      // Filter out the question to be updated, then check for duplicates (prevent error when updating without changing title)
      let newArray = questions.filter((qn) => qn.id !== updatedQuestion.id);
      const updatedQuestionString = await QuestionRequestHandler.updateQuestion(updatedQuestion);

      setQuestions(questions.map((q) => (q.id === updatedQuestionString.id ? updatedQuestionString : q)));
      setEditModalIsVisible(false);
      console.log(`Question ${question.id} updated!`);
    } catch (e) {
      let result = (e as Error).message;
      console.log(result);
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
      });
    } catch (error) {
      console.log('Failed to load questions');
    }
  }, []);

  function viewDescriptionHandler(id: string) {
    const selectedQuestion = questions.filter(i => i.id.toString() === id)[0];
    if (selectedQuestion !== undefined) {
      setQuestionCache(selectedQuestion);
      console.log(selectedQuestion);
    }
    setViewModalIsVisible(true);
  }

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
          data={questionCache}
          closeHandler={() => { setViewModalIsVisible(false); }}
          editModalHandler={(id: string) => {
            setViewModalIsVisible(false);
            setEditModalIsVisible(true);
          }}
          deleteHandler={(id: string) => {
            try {
              QuestionRequestHandler.deleteQuestion(id);
              console.log('deleted');
              setQuestions(questions.filter(i => i.id !== id));

              setViewModalIsVisible(false);
            } catch (error) {
              console.log('delete fail');
            }
          }}
        />
        <EditQuestionModal
          isVisible={editModalIsVisible}
          questionToEdit={currentQuestion}
          closeHandler={() => setEditModalIsVisible(false)}
          submitUpdateHandler={submitUpdateHandler}
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
