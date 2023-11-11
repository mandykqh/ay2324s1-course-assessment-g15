import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import { QuestionString, emptyQuestionString } from '../Commons';
import { useEffect, useState } from 'react';
import { Center, Flex, useToast } from '@chakra-ui/react';
import { QuestionCacheContext } from '../contexts/QuestionCacheContext';
import QuestionDetailsModal from '../components/question/modals/QuestionDetailsModal';
import AddQuestionModal from '../components/question/modals/AddQuestionModal';
import QuestionTable from '../components/question/QuestionTable';
import EditQuestionModal from '../components/question/modals/EditQuestionModal';
import QuestionValidator from '../models/question/QuestionValidator';
import NavigationBar from '../components/NavigationBar';
import { authChecker, showError, showSuccess } from '../Util';
import LoadingPage from './LoadingPage';
import FilterBar from '../components/question/FilterBar';
import LocalStorageHandler from "../handlers/LocalStorageHandler";

let currentQuestion = emptyQuestionString;

const QuestionPage = () => {
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [questionCache, setQuestionCache] = useState<QuestionString>(emptyQuestionString);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const ctxValue = { questionCache: questionCache, setQuestionCache: setQuestionCache };
  const toast = useToast();

  const onFilter = (filterOptions: { categories: string[]; complexity: string }) => {
    const { categories, complexity } = filterOptions;
    let filtered = questions;
    if (categories) {
      filtered = filtered.filter((question) => {
        return categories.every(c => question.categories.includes(c));
      });
    }
    if (complexity) {
      filtered = filtered.filter((question) => question.complexity === complexity);
    }
    setFilteredQuestions(filtered);
    LocalStorageHandler.storeFilterData(categories, complexity, filtered);
  }

  async function submitHandler() {
    try {
      let validator = new QuestionValidator();
      validator.validateEmptyFields(questionCache);
      QuestionRequestHandler.createQuestionAndGetID(questionCache).then((id) => {
        setQuestions([...questions, { ...questionCache, id: id }]);
        setFilteredQuestions([...filteredQuestions, { ...questionCache, id: id }]);
        setAddModalIsVisible(false);
        showSuccess('Question added', toast);
      });
    } catch (e) {
      showError((e as Error).message, toast);
    }
  }

  async function submitUpdateHandler(question: QuestionString) {
    try {
      let validator = new QuestionValidator();
      validator.validateEmptyFields(questionCache);
      await QuestionRequestHandler.updateQuestion(questionCache).then(() => {
        setQuestions(questions.map((q) => (q.id === questionCache.id ? questionCache : q)!));
        setEditModalIsVisible(false);
        showSuccess(`Question ${question.id} updated!`, toast)
      });
    } catch (e) {
      showError((e as Error).message, toast);
    }
  }

  useEffect(() => {
    try {
      QuestionRequestHandler.loadQuestions().then((questions: QuestionString[]) => {
        setQuestions(questions);
        setFilteredQuestions(questions);
      });
    } catch (error) {
      showError('Failed to load questions', toast);
    }
  }, []);

  function viewDescriptionHandler(id: string) {
    const selectedQuestion = questions.filter(i => i.id.toString() === id)[0];
    if (selectedQuestion !== undefined) {
      setQuestionCache(selectedQuestion);
    }
    setViewModalIsVisible(true);
  }

  authChecker(setIsAuthenticated);
  if (isAuthenticated) {
    return (
      <QuestionCacheContext.Provider value={ctxValue}>
        <NavigationBar index={0} />
        <Center pt={50}>
          <Flex flexDirection="column" alignItems="center">
            <FilterBar onFilter={onFilter} />
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
                  showSuccess('Question deleted!', toast)
                  setFilteredQuestions(questions.filter(i => i.id !== id));
                  setViewModalIsVisible(false);
                } catch (error) {
                  showError('delete fail', toast);
                }
              }}
            />
            <EditQuestionModal
              isVisible={editModalIsVisible}
              questionToEdit={currentQuestion}
              closeHandler={() => setEditModalIsVisible(false)}
              submitUpdateHandler={submitUpdateHandler}
            />
            {filteredQuestions.length > 0 && (
              <QuestionTable
                data={filteredQuestions}
                viewDescriptionHandler={viewDescriptionHandler}
                addBtnOnClick={() => {
                  setQuestionCache(emptyQuestionString)
                  setAddModalIsVisible(true);
                }}
              />
            )}
            {filteredQuestions.length == 0 && <p>No results found</p>}
          </Flex>
        </Center>
      </QuestionCacheContext.Provider>
    )
  } else {
    return <LoadingPage />
  }
};

export default QuestionPage;