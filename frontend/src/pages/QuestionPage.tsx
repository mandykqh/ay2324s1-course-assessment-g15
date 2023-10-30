// import QuestionRequestHandler from '../handlers/QuestionRequestHandler';
// import { QuestionString, emptyQuestionString } from '../Commons';
// import { useEffect, useState } from 'react';
// import { Center, Flex, useToast } from '@chakra-ui/react';
// import { QuestionCacheContext } from '../contexts/QuestionCacheContext';
// import QuestionDetailsModal from '../components/question/modals/QuestionDetailsModal';
// import AddQuestionModal from '../components/question/modals/AddQuestionModal';
// import QuestionTable from '../components/question/QuestionTable';
// import EditQuestionModal from '../components/question/modals/EditQuestionModal';
// import QuestionValidator from '../models/question/QuestionValidator';
// import NavigationBar from '../components/NavigationBar';
// import { showError, showSuccess } from '../Util';
// import AuthRequestHandler from '../handlers/AuthRequestHandler';
// import LoadingPage from './LoadingPage';
// import FilterBar from '../components/question/FilterBar';
// import { FlatTree } from 'framer-motion';

// let currentQuestion = emptyQuestionString;

// const QuestionPage = () => {
//   const [addModalIsVisible, setAddModalIsVisible] = useState(false);
//   const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
//   const [editModalIsVisible, setEditModalIsVisible] = useState(false);
//   const [questions, setQuestions] = useState<QuestionString[]>([]);
//   const [questionCache, setQuestionCache] = useState<QuestionString>(emptyQuestionString);
//   const ctxValue = { questionCache: questionCache, setQuestionCache: setQuestionCache };
//   const toast = useToast();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   const [filteredQuestions, setFilteredQuestions] = useState(questions);
//   const [complexityFilter, setComplexityFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

//   const handleFilter = (filters) => {

//     // setComplexityFilter(filters.complexity)

//     const { category, complexity } = filters;

//     // Apply both category and complexity filters
//     let filtered = questions;

//     if (category) {
//       filtered = filtered.filter((question) => question.categories.includes(category));
//       console.log(categoryFilter)
//       console.log(filtered)
//     }

//     if (complexity) {
//       filtered = filtered.filter((question) => question.complexity === complexity);
//     }
//     setFilteredQuestions(filtered);
//     setComplexityFilter(complexity);
//     setCategoryFilter(category);
//   };

//   const onCategorySelected = (category: string[]) => {
//     let filtered = questions;
//     filtered = filtered.filter((question) => {
//       console.log(category.every(c => question.categories.includes(c)))
//       return category.every(c => question.categories.includes(c))
//     })
//     setFilteredQuestions(filtered)
//     setCategoryFilter(category)
//   }

//   // useEffect(() => {
//   //   // console.log('Complexity Filter:', complexityFilter);
//   //   let filteredQuestions = questions.filter((q) => q.complexity === complexityFilter)
//   //   setFilteredQuestions(filteredQuestions)
//   //   console.log(filteredQuestions)
//   // }, [complexityFilter]);

//   useEffect(() => {
//     AuthRequestHandler.isAuth()
//       .then(res => {
//         setIsAuthenticated(res.isAuth);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }, []);

//   function clearQuestionCache() {
//     setQuestionCache(emptyQuestionString);
//   }

//   async function submitHandler() {
//     try {
//       let validator = new QuestionValidator();
//       validator.validateEmptyFields(questionCache);
//       await QuestionRequestHandler.createQuestionAndGetID(questionCache).then((id) => {
//         setQuestions([...questions, { ...questionCache, id: id }]);
//       }
//       );
//       setAddModalIsVisible(false);
//       showSuccess('Question added', toast);
//     } catch (e) {
//       showError((e as Error).message, toast);
//     }
//   }

//   async function submitUpdateHandler(question: QuestionString) {
//     try {
//       let validator = new QuestionValidator();
//       validator.validateEmptyFields(questionCache);
//       await QuestionRequestHandler.updateQuestion(questionCache).then(() => {
//         setQuestions(questions.map((q) => (q.id === questionCache.id ? questionCache : q)!));
//         setEditModalIsVisible(false);
//         showSuccess(`Question ${question.id} updated!`, toast)
//       });
//     } catch (e) {
//       showError((e as Error).message, toast);
//     }
//   }

//   useEffect(() => {
//     try {
//       QuestionRequestHandler.loadQuestions().then((questions: QuestionString[]) => {
//         setQuestions(questions);
//       });
//     } catch (error) {
//       showError('Failed to load questions', toast);
//     }
//   }, []);

//   function viewDescriptionHandler(id: string) {
//     const selectedQuestion = questions.filter(i => i.id.toString() === id)[0];
//     if (selectedQuestion !== undefined) {
//       setQuestionCache(selectedQuestion);
//     }
//     setViewModalIsVisible(true);
//   }
//   // console.log(questions.filter(i => i.complexity == 'Easy'))

//   if (isAuthenticated) {
//     return (
//       <QuestionCacheContext.Provider value={ctxValue}>
//         <NavigationBar index={0} />
//         <Center pt={50}>
//           <Flex flexDirection="column" alignItems="center">
//             {/* <FilterBar onFilter={handleFilter} /> */}
//             <FilterBar categorySelected={onCategorySelected} />

//             <AddQuestionModal
//               isVisible={addModalIsVisible}
//               closeHandler={() => setAddModalIsVisible(false)}
//               submitHandler={submitHandler}
//             />
//             <QuestionDetailsModal
//               isVisible={viewModalIsVisible}
//               data={questionCache}
//               closeHandler={() => { setViewModalIsVisible(false); }}
//               editModalHandler={() => {
//                 setViewModalIsVisible(false);
//                 setEditModalIsVisible(true);
//               }}
//               deleteHandler={(id: string) => {
//                 try {
//                   QuestionRequestHandler.deleteQuestion(id);
//                   showSuccess('Question deleted!', toast)
//                   setQuestions(questions.filter(i => i.id !== id));
//                   setViewModalIsVisible(false);
//                 } catch (error) {
//                   showError('delete fail', toast);
//                 }
//               }}
//             />
//             <EditQuestionModal
//               isVisible={editModalIsVisible}
//               questionToEdit={currentQuestion}
//               closeHandler={() => setEditModalIsVisible(false)}
//               submitUpdateHandler={submitUpdateHandler}
//             />
//             {filteredQuestions.length > 0 || !complexityFilter && !categoryFilter ? (
//               <QuestionTable
//                 data={filteredQuestions.length > 0 ? filteredQuestions : questions}
//                 viewDescriptionHandler={viewDescriptionHandler}
//                 addBtnOnClick={() => {
//                   clearQuestionCache();
//                   setAddModalIsVisible(true);
//                 }}
//               />
//             ) : (
//               <p>No results found</p>
//             )}


//           </Flex>
//         </Center>
//       </QuestionCacheContext.Provider>
//     )
//   } else {
//     return <LoadingPage />
//   }
// };

// export default QuestionPage;



// ---------------------------

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
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const handleFilter = (filters) => {

    // setComplexityFilter(filters.complexity)

    const { category, complexity } = filters;

    // Apply both category and complexity filters
    let filtered = questions;

    if (category) {
      filtered = filtered.filter((question) => question.categories.includes(category));
      console.log(categoryFilter)
      console.log(filtered)
    }

    if (complexity) {
      filtered = filtered.filter((question) => question.complexity === complexity);
    }
    setFilteredQuestions(filtered);
    setComplexityFilter(complexity);
    setCategoryFilter(category);
  };

  // useEffect(() => {
  //   // console.log('Complexity Filter:', complexityFilter);
  //   let filteredQuestions = questions.filter((q) => q.complexity === complexityFilter)
  //   setFilteredQuestions(filteredQuestions)
  //   console.log(filteredQuestions)
  // }, [complexityFilter]);

  // const onFilter = (filterOptions: { categories: string[]; complexity: string }) => {
  //   let filtered = questions;


  //   // filtered = filtered.filter((question) => {
  //   //   console.log(category.every(c => question.categories.includes(c)))
  //   //   return category.every(c => question.categories.includes(c))
  //   // })
  //   filtered = filtered.filter((question) => {
  //     console.log(category.every(c => question.categories.includes(c)))
  //     return category.every(c => question.categories.includes(c))
  //   }).filter((question)=>question.complexity === complexity)
  //   setFilteredQuestions(filtered)
  //   setCategoryFilter(category)
  //   console.log('fil q: ' + filteredQuestions)
  //   console.log('cat fil: ' + categoryFilter)
  // }
  const onFilter = (filterOptions: { categories: string[]; complexity: string }) => {
    const { categories, complexity } = filterOptions;
    console.log(questions)
    console.log(categories)
    let filtered = questions;

    filtered = filtered.filter((question) => {
      return categories.every(c => question.categories.includes(c));
    });
    filtered = filtered.filter((question) => question.complexity === complexity);

    setFilteredQuestions(filtered);
    console.log(filtered)
    // setCategoryFilter(categories);
  }


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
            {filteredQuestions.length > 0 || !complexityFilter && !categoryFilter ? (
              <QuestionTable
                data={filteredQuestions.length > 0 ? filteredQuestions : questions}
                viewDescriptionHandler={viewDescriptionHandler}
                addBtnOnClick={() => {
                  clearQuestionCache();
                  setAddModalIsVisible(true);
                }}
              />
            ) : (
              <p>No results found</p>
            )}

          </Flex>
        </Center>
      </QuestionCacheContext.Provider>
    )
  } else {
    return <LoadingPage />
  }
};

export default QuestionPage;