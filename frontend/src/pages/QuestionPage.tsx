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
import { showError, showSuccess } from '../Util';
import AuthRequestHandler from '../handlers/AuthRequestHandler';
import LoadingPage from './LoadingPage';
import FilterBar from '../components/question/FilterBar';
import { FlatTree } from 'framer-motion';

let currentQuestion = emptyQuestionString;

const QuestionPage = () => {
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


  // const filterQuestions = (categoryFilter, complexityFilter) => {
  //   // Implement your filtering logic here
  //   // For example, filter based on the category and complexity filters
  //   const filtered = questions.filter((question) => {
  //     if (
  //       (!categoryFilter || question.categories.includes(categoryFilter)) &&
  //       (!complexityFilter || question.complexity === complexityFilter)
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   setFilteredQuestions(filtered);
  // };

  const handleFilter = (filters) => {
    // if (filters.complexity) {
    //   setComplexityFilter(filters.complexity);
    // }
    setComplexityFilter(filters.complexity)
  };

  useEffect(() => {
    console.log('Complexity Filter:', complexityFilter);
    let filteredQuestions = questions.filter((q) => q.complexity === complexityFilter)
    // console.log(filteredQuestions)
    setFilteredQuestions(filteredQuestions)
    console.log(filteredQuestions)
  }, [complexityFilter]);

  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => {
        setIsAuthenticated(res.isAuth);
      })
      .catch(e => {
        console.log(e);
      });
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
  // console.log(questions.filter(i => i.complexity == 'Easy'))

  if (isAuthenticated) {
    return (
      <QuestionCacheContext.Provider value={ctxValue}>
        <NavigationBar index={0} />
        <Center pt={50}>
          <Flex flexDirection="column" alignItems="center">
            <FilterBar onFilter={handleFilter} />

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
                  setQuestions(questions.filter(i => i.id !== id));
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

            <QuestionTable
              data={complexityFilter ? filteredQuestions : questions}
              viewDescriptionHandler={viewDescriptionHandler}
              addBtnOnClick={() => {
                clearQuestionCache();
                setAddModalIsVisible(true);
              }}
            />

          </Flex>
        </Center>
      </QuestionCacheContext.Provider>
    )
  } else {
    return <LoadingPage />
  }
};

export default QuestionPage;
