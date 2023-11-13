import { useEffect, useState } from 'react';
import { Center, Flex, useToast } from '@chakra-ui/react';
import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import QuestionDetailsModal from '../components/question/modals/QuestionDetailsModal';
import EditQuestionModal from '../components/question/modals/EditQuestionModal';
import AddQuestionModal from '../components/question/modals/AddQuestionModal';
import QuestionTable from '../components/question/QuestionTable';
import { QuestionCacheContext } from '../contexts/QuestionCacheContext';
import QuestionValidator from '../models/question/QuestionValidator';
import FilterBar from '../components/question/FilterBar';
import NavigationBar from '../components/NavigationBar';
import LoadingPage from './LoadingPage';
import { QuestionString, emptyQuestionString } from '../Commons';
import { authChecker, showError, showSuccess } from '../Util';

let currentQuestion = emptyQuestionString;

const QuestionPage = () => {
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [questionCache, setQuestionCache] = useState<QuestionString>(emptyQuestionString);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const ctxValue = { questionCache, setQuestionCache };
  const toast = useToast();

  // Load Question on pageload
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

  function renderAddQuestionModal() {
    const addQuestionHandler = () => {
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

    return (
      <AddQuestionModal
        isVisible={addModalIsVisible}
        closeHandler={() => setAddModalIsVisible(false)}
        submitHandler={addQuestionHandler}
      />
    );
  }

  function renderQuestionDetailsModal() {
    const handleEdit = () => {
      setViewModalIsVisible(false);
      setEditModalIsVisible(true);
    }

    const handleDelete = (id: string) => {
      try {
        QuestionRequestHandler.deleteQuestion(id);
        showSuccess('Question deleted!', toast)
        setFilteredQuestions(questions.filter(i => i.id !== id));
        setViewModalIsVisible(false);
      } catch (error) {
        showError('delete fail', toast);
      }
    }

    return (
      <QuestionDetailsModal
        isVisible={viewModalIsVisible}
        data={questionCache}
        closeHandler={() => { setViewModalIsVisible(false); }}
        editModalHandler={handleEdit}
        deleteHandler={(id: string) => handleDelete(id)}
      />
    );
  }

  function renderEditQuestionModal() {
    const updateQuestionHandler = (question: QuestionString) => {
      try {
        let validator = new QuestionValidator();
        validator.validateEmptyFields(questionCache);
        QuestionRequestHandler.updateQuestion(questionCache).then(() => {
          setQuestions(questions.map((q) => (q.id === questionCache.id ? questionCache : q)!));
          setEditModalIsVisible(false);
          showSuccess(`Question ${question.id} updated!`, toast)
        });
      } catch (e) {
        showError((e as Error).message, toast);
      }
    }

    return (
      <EditQuestionModal
        isVisible={editModalIsVisible}
        questionToEdit={currentQuestion}
        closeHandler={() => setEditModalIsVisible(false)}
        submitUpdateHandler={updateQuestionHandler}
      />
    );
  }

  function renderQuestionTable() {
    const viewQuestionHandler = (id: string) => {
      const selectedQuestion = questions.filter(i => i.id.toString() === id)[0];
      if (selectedQuestion !== undefined) {
        setQuestionCache(selectedQuestion);
      }
      setViewModalIsVisible(true);
    }

    return (
      <QuestionTable
        data={filteredQuestions.sort((a, b) => parseInt(a.id) - parseInt(b.id))}
        viewDescriptionHandler={viewQuestionHandler}
        addBtnOnClick={() => {
          setQuestionCache(emptyQuestionString)
          setAddModalIsVisible(true);
        }}
      />
    );
  }

  function renderFilterBar() {
    function onFilter({ categories, complexity }: { categories: string[]; complexity: string }) {
      const filtered = questions.filter((question) => {
        const categoryFilter = !categories || categories.every(c => question.categories.includes(c));
        const complexityFilter = !complexity || question.complexity === complexity;
        return categoryFilter && complexityFilter;
      });
      setFilteredQuestions(filtered);
      LocalStorageHandler.storeFilterData(categories, complexity, filtered);
    }

    return (
      <FilterBar onFilter={onFilter} />
    );
  }

  function renderPageContent() {
    return (
      <>
        <NavigationBar index={0} />
        <Center pt={50}>
          <Flex flexDirection="column" alignItems="center">
            {renderFilterBar()}
            {renderAddQuestionModal()}
            {renderQuestionDetailsModal()}
            {renderEditQuestionModal()}
            {filteredQuestions.length > 0 && renderQuestionTable()}
            {filteredQuestions.length == 0 && <p>No results found</p>}
          </Flex>
        </Center>
      </>
    );
  }

  function renderAuthenticatedPage() {
    return (
      <QuestionCacheContext.Provider value={ctxValue}>
        {renderPageContent()}
      </QuestionCacheContext.Provider>
    );
  }

  authChecker(setIsAuthenticated);
  return isAuthenticated ? renderAuthenticatedPage() : <LoadingPage />
};

export default QuestionPage;