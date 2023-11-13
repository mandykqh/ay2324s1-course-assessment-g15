import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
import { QuestionString, emptyQuestionString } from '../Commons';
import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, HStack, useToast } from '@chakra-ui/react';
import { QuestionCacheContext } from '../contexts/QuestionCacheContext';
import QuestionDetailsModal from '../components/question/modals/QuestionDetailsModal';
import AddQuestionModal from '../components/question/modals/AddQuestionModal';
import QuestionTable from '../components/question/QuestionTable';
import EditQuestionModal from '../components/question/modals/EditQuestionModal';
import QuestionValidator from '../models/question/QuestionValidator';
import NavigationBar from '../components/NavigationBar';
import { showError, showSuccess } from '../Util';
import AuthRequestHandler from '../handlers/AuthRequestHandler';
import LoadingPage from './LoadingPage';
import { FlatTree } from 'framer-motion';
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import FilterBar from '../components/question/FilterBar';
import UserHistory from '../components/user/userManagement/UserHistory';

let currentQuestion = emptyQuestionString;

interface Props {
  addBtnOnClick: () => void;
}

const QuestionPage: React.FC<Props> = ({ addBtnOnClick }) => {
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [questionCache, setQuestionCache] = useState<QuestionString>(emptyQuestionString);
  const ctxValue = { questionCache: questionCache, setQuestionCache: setQuestionCache };
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [complexityFilter, setComplexityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const userData = LocalStorageHandler.getUserData();
  const userRole = userData ? userData.role : null;


  const onFilter = (filterOptions: { categories: string[]; complexity: string }) => {
    const { categories, complexity } = filterOptions;
    setComplexityFilter(complexity);
    setCategoryFilter(categories);

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
    console.log(filtered)

    LocalStorageHandler.storeFilterData(categories, complexity, filtered);
  }


  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => {
        setIsAuthenticated(res.isAuth);
      })
      .catch(e => {
        console.log(e);
      });

    // const filterData = LocalStorageHandler.getFilterData();

    // if (filterData) {
    //   const { categoryFilter, complexityFilter, filteredQuestions } = filterData;
    //   setCategoryFilter(categoryFilter);
    //   setComplexityFilter(complexityFilter);
    //   setFilteredQuestions(filteredQuestions);
    // }
  }, []);

  function clearQuestionCache() {
    setQuestionCache(emptyQuestionString);
  }

  async function submitHandler() {
    try {
      let validator = new QuestionValidator();
      validator.validateEmptyFields(questionCache);
      await QuestionRequestHandler.createQuestionAndGetID(questionCache).then((id) => {
        setQuestions([...questions, { ...questionCache, id: id }]);
        setFilteredQuestions([...filteredQuestions, { ...questionCache, id: id }]);
      }
      );
      setAddModalIsVisible(false);
      showSuccess('Question added', toast);
    } catch (e) {
      showError((e as Error).message, toast);
    }
  }

  async function submitUpdateHandler(question: QuestionString) {
    try {
      let validator = new QuestionValidator();
      validator.validateEmptyFields(questionCache);
      await QuestionRequestHandler.updateQuestion(questionCache).then(() => {
        setFilteredQuestions(questions.map((q) => (q.id === questionCache.id ? questionCache : q)!));
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

  if (isAuthenticated) {
    return (
      <QuestionCacheContext.Provider value={ctxValue}>
        <NavigationBar index={0} />
        <Flex direction="row" align="start" pt={50} wrap="nowrap">
          {/* Left content - QuestionTable */}
          <Flex flexDirection="column" alignItems="center" flex="6" overflowY="auto" >
            <Box maxWidth={'50vw'} >
              <HStack mt='20px'>
                <FilterBar onFilter={onFilter} />
                {userRole === 'ADMIN' && (
                  <Button colorScheme='blue'
                    borderRadius='10px'
                    w='120px'
                    ml='5px'
                    onClick={() => {
                      clearQuestionCache();
                      setAddModalIsVisible(true);
                    }}
                    my={5}
                    float='right'>
                    Add
                  </Button>
                )}
              </HStack>
            </Box>
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
                  showSuccess('Question deleted!', toast);
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
            {filteredQuestions.length > 0 ? (
              <QuestionTable
                data={filteredQuestions}
                viewDescriptionHandler={viewDescriptionHandler}
              />
            ) : (
              <p>No results found</p>
            )}
          </Flex>

          {/* Right content - UserHistory */}
          <Flex direction="column" flex="4" overflowY="auto" pt={50}>
            <UserHistory />
          </Flex>
        </Flex>
      </QuestionCacheContext.Provider>
    )
  } else {
    return <LoadingPage />
  }

};

export default QuestionPage;