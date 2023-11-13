import { useEffect, useState } from 'react';
import { Box, Button, Flex, HStack, useToast } from '@chakra-ui/react';
import QuestionDetailsModal from '../components/question/modals/QuestionDetailsModal';
import AddQuestionModal from '../components/question/modals/AddQuestionModal';
import EditQuestionModal from '../components/question/modals/EditQuestionModal'
import QuestionValidator from '../models/question/QuestionValidator';
import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import FilterBar from '../components/question/FilterBar';
import NavigationBar from '../components/NavigationBar';
import UserHistory from '../components/user/userManagement/UserHistory';
import LoadingPage from './LoadingPage';
import QuestionTable from '../components/question/QuestionTable';;
import { QuestionCacheContext } from '../contexts/QuestionCacheContext';
import { authChecker, showError, showSuccess } from '../Util';
import { QuestionString, emptyQuestionString } from '../Commons';

let currentQuestion = emptyQuestionString;

const QuestionPage = () => {
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [questionCache, setQuestionCache] = useState<QuestionString>(emptyQuestionString);
  const ctxValue = { questionCache: questionCache, setQuestionCache: setQuestionCache };
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const userData = LocalStorageHandler.getUserData();
  const userRole = userData ? userData.role : null;
  const toast = useToast();

  function renderFilterBar() {
    function onFilter({ categories, complexity }: { categories: string[]; complexity: string }) {
      if (questions.length === 0) {
        return;
      }

      const filtered = questions.filter((question) => {
        const categoryFilter = !categories || categories.every(c => question.categories.includes(c));
        const complexityFilter = !complexity || question.complexity === complexity;
        return categoryFilter && complexityFilter;
      });
      setFilteredQuestions(filtered);
      LocalStorageHandler.storeFilterData(categories, complexity, filtered);
    }
    return <FilterBar onFilter={onFilter} />;
  }

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

    if (filteredQuestions.length === 0) {
      return <p>No results found</p>;
    }

    return (
      <QuestionTable
        data={filteredQuestions.sort((a, b) => parseInt(a.id) - parseInt(b.id))}
        viewDescriptionHandler={viewQuestionHandler}
      />
    );
  }

  function renderAddButton() {
    const onClickHandler = () => {
      setQuestionCache(emptyQuestionString);
      setAddModalIsVisible(true);
    }
    return (
      <Button colorScheme='blue'
        borderRadius='10px'
        w='120px'
        ml='5px'
        onClick={onClickHandler}
        my={5}
        float='right'
      >
        Add
      </Button>
    );
  }

  function renderLeftPanel() {
    return (
      <Flex flexDirection="column" alignItems="center" flex="6" overflowY="auto" >
        <Box maxWidth={'50vw'} >
          <HStack mt='20px'>
            {renderFilterBar()}
            {userRole === 'ADMIN' && renderAddButton()}
          </HStack>
        </Box>
        {renderAddQuestionModal()}
        {renderQuestionDetailsModal()}
        {renderEditQuestionModal()}
        {renderQuestionTable()}
      </Flex>
    );
  }

  function renderRightPanel() {
    return (
      <Flex direction="column" flex="4" overflowY="auto" pt={50}>
        <UserHistory />
      </Flex>
    );
  }

  function renderAuthenticatedPage() {
    return (
      <QuestionCacheContext.Provider value={ctxValue}>
        <NavigationBar index={0} />
        <Flex direction="row" align="start" pt={50} wrap="nowrap">
          {renderLeftPanel()}
          {renderRightPanel()}
        </Flex>
      </QuestionCacheContext.Provider>
    );
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

  authChecker(setIsAuthenticated);
  return isAuthenticated ? renderAuthenticatedPage() : <LoadingPage />
};

export default QuestionPage;
