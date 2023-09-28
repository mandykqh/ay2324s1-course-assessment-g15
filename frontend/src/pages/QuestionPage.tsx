import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import { QuestionString, emptyQuestionString, questionStringTemplate } from '../Commons';
import { useEffect, useState } from 'react';
import { Center } from '@chakra-ui/react';
import { QuestionCacheContext } from '../contexts/QuestionCacheContext';
import QuestionDetailsModal from '../components/question/modals/QuestionDetailsModal';
import AddQuestionModal from '../components/question/modals/AddQuestionModal';
import QuestionTable from '../components/question/QuestionTable';
import EditQuestionModal from '../components/question/modals/EditQuestionModal';
import QuestionValidator from '../models/QuestionValidator';

let currentQuestion = emptyQuestionString;

const QuestionPage = () => {
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [questionCache, setQuestionCache] = useState<QuestionString>(emptyQuestionString);
  const ctxValue = { questionCache: questionCache, setQuestionCache: setQuestionCache };

  function clearQuestionCache() {
    setQuestionCache(emptyQuestionString);
  }

  async function submitHandler() {
    try {
      let validator = new QuestionValidator();
      validator.validateEmptyFields(questionCache);
      await QuestionRequestHandler.createQuestionAndGetID(questionCache).then((id) => {
        setQuestions([...questions, { ...questionCache, id: id }]);
      }
      );
      setAddModalIsVisible(false);
      console.log('Question added');
    } catch (e) {
      let result = (e as Error).message;
      console.log(result);
    }
  }

  async function submitUpdateHandler(question: QuestionString) {
    try {
      let validator = new QuestionValidator();
      validator.validateEmptyFields(questionCache);
      await QuestionRequestHandler.updateQuestion(questionCache).then(() => {
        setQuestions(questions.map((q) => (q.id === questionCache.id ? questionCache : q)!));
        setEditModalIsVisible(false);
        console.log(`Question ${question.id} updated!`);
      });
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  useEffect(() => {
    try {
      QuestionRequestHandler.loadQuestions().then((questions: QuestionString[]) => {
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
    <QuestionCacheContext.Provider value={ctxValue}>
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
          editModalHandler={() => {
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
          addBtnOnClick={() => {
            clearQuestionCache();
            setAddModalIsVisible(true)
          }}
        />
      </Center>
    </QuestionCacheContext.Provider>
  )
};

export default QuestionPage;
