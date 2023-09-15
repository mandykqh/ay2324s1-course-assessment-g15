import { useState, useEffect } from "react";
import AddQuestion from "./AddQuestion";
import DescriptionPopup from "./DescriptionPopup";
export default function QuestionBank() {
    const [questions, setQuestions] = useState([]);
    const toAddQuestion = newQuestion => setQuestions([...questions, newQuestion]);

    // Load questions
    useEffect(() => {
        const loadedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
        if (loadedQuestions.length > 0) {
            setQuestions(loadedQuestions);
        }
    }, []);

    // Save questions
    useEffect(() => {
        localStorage.setItem("questions", JSON.stringify(questions));
    }, [questions]);

    // Handle question description popup
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState("");

    const displayDescriptionPopup = (question, questionId) => {
        setSelectedQuestion(question);
        setIsShowPopup(true);
        setSelectedQuestionId(questionId);
    }

    const toCloseDescriptionPopup = (question, questionId) => {
        setSelectedQuestion("");
        setIsShowPopup(false);
    }

    // Delete question
    const deleteQuestion = (toDeleteQnId) => {
        const remainingQuestions = questions.filter(qn => qn.id !== toDeleteQnId);
        setQuestions(remainingQuestions);
        localStorage.setItem("questions", JSON.stringify(remainingQuestions));
    }
    return (
        <div>
            <div className="questionBank">
                <h2>Question Bank</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Complexity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, id) => (
                            <tr key={question.id}>
                                <td>{id + 1}</td>
                                <td>
                                    <button onClick={() => displayDescriptionPopup(question, id)}>{question.title}</button>
                                </td>
                                <td>{question.category}</td>
                                <td>{question.complexity}</td>
                                <td><button id="deleteButton" onClick={() => deleteQuestion(question.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {isShowPopup && < DescriptionPopup qn={selectedQuestion} idx={selectedQuestionId} toClose={toCloseDescriptionPopup} />}
            <div className="addQuestion">
                <AddQuestion questions={questions} toAddQuestion={toAddQuestion} />

            </div>
        </div>
    );
}

