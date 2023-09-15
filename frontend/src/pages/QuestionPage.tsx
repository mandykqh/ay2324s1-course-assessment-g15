import './QuestionPage.css';
import { Button } from '@mui/material';
import { questionSet } from '../MockData';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import { QuestionString } from '../models/Question';
import QuestionStringBuilder from '../models/QuestionStringBuilder';
import React, { useEffect, useState } from 'react';
import AddQuestionModal from '../components/question/addModal/AddQuestionModal';
import DescriptionModal from '../components/question/descriptionModal/DescriptionModal';
import QuestionTable from '../components/question/QuestionTable';
import { Notification, NotificationType } from '../components/question/Notification';
import QuestionValidator from '../models/QuestionValidator';


let qn = { title: '', category: '', complexity: '', description: '' };

const QuestionPage = () => {

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCategories, setNewCategories] = useState('');
  const [newComplexity, setNewComplexity] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLink, setNewLink] = useState('');
  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [isDeleting, setIsDeleting] = useState(false);
  const [notifShowing, setIsNotifShowing] = useState(false);
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState<NotificationType>(NotificationType.SUCCESS);

  function showNotification(message: string, type: NotificationType) {
    setIsNotifShowing(true);
    setNotifMessage(message);
    setNotifType(type);
  }

  function closeViewModal() {
    setViewModalIsVisible(false);
  }

  function submitHandler() {
    let builder = new QuestionStringBuilder();
    builder.setId(LocalStorageHandler.getNextQuestionId()); //TODO get ID from mongodb
    builder.setTitle(newTitle);
    builder.setComplexity(newComplexity);
    builder.setCategories(newCategories);
    builder.setLink(newLink);
    builder.setDescription(newDescription);

    let newArr = questions;
    try {
      let validator = new QuestionValidator();
      newArr = [...questions, builder.build()];
      validator.validateDuplicateQuestions(builder.build(), questions);
      setQuestions(newArr);
      setAddModalIsVisible(false);
      LocalStorageHandler.saveQuestion(newArr);
      showNotification('Question added', NotificationType.SUCCESS);
    } catch (e) {
      let result = (e as Error).message;
      showNotification(result, NotificationType.ERROR);
    }
  }

  useEffect(() => {
    if (Object.keys(LocalStorageHandler.loadQuestion()).length === 0) {
      setQuestions(questionSet);
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
    qn.title = (selectedQuestion.title);
    qn.category = (selectedQuestion.categories);
    qn.complexity = (selectedQuestion.complexity);
    qn.description = (selectedQuestion.description);
  }

  return (
    <div id='question-page-container'>
      <AddQuestionModal
        isVisible={addModalIsVisible} closeHandler={() => setAddModalIsVisible(false)}
        titleSetter={setNewTitle} linkSetter={setNewLink}
        categoriesSetter={setNewCategories} complexitySetter={setNewComplexity}
        descriptionSetter={setNewDescription} submitHandler={submitHandler}
      />
      <DescriptionModal
        isVisible={viewModalIsVisible} data={qn} closeHandler={closeViewModal}
      />

      <Notification
        isOpen={notifShowing}
        setter={setIsNotifShowing}
        message={notifMessage}
        type={notifType}
      />

      <div style={{ width: '100' }}>
        <div id='button-container'>
          <Button id='add-btn' variant='contained' onClick={() => setAddModalIsVisible(true)}>
            Add
          </Button>
          <Button id='delete-btn' variant='contained' color='error'
            onClick={() => setIsDeleting(!isDeleting)}>
            Delete
          </Button>
        </div>
        <QuestionTable
          data={questions}
          viewDescriptionHandler={viewDescriptionHandler}
          deleteHandler={(id: string) => {
            setQuestions(questions.filter(i => i.id !== id));
            LocalStorageHandler.saveQuestion(questions.filter(i => i.id !== id));
          }}
          isDeleting={isDeleting} />
      </div>
    </div>
  )
};

export default QuestionPage;