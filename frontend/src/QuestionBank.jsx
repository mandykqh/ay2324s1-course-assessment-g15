import { useState, useEffect } from "react";
import AddQuestion from "./AddQuestion";
import DescriptionPopup from "./DescriptionPopup";
export default function QuestionBank() {
    const [questions, setQuestions] = useState([]);
    const toAddQuestion = newQuestion => setQuestions([...questions, newQuestion]);

    // Load questions
    useEffect(() => {
        const loadedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
        // console.log("Loaded Questions:", loadedQuestions);
        if (loadedQuestions.length > 0) {
            setQuestions(loadedQuestions);
        }
    }, []);

    // Save questions
    useEffect(() => {
        console.log("Saving Questions:", questions);
        localStorage.setItem("questions", JSON.stringify(questions));
    }, [questions]);

    // Handle question description popup
    const [selectedQuestionDescription, setSelectedQuestionDescription] = useState("");
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState("");

    const displayDescriptionPopup = (questionDescription, questionId) => {
        setSelectedQuestionDescription(questionDescription);
        setIsShowPopup(true);
        setSelectedQuestionId(questionId);

        console.log(`this is set: ${selectedQuestionDescription}`);
    }

    const toCloseDescriptionPopup = (questionDescription, questionId) => {
        setSelectedQuestionDescription("");
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
                                    <button onClick={() => displayDescriptionPopup(question.description, id)}>{question.title}</button>
                                    {console.log("Description:", question.description)}
                                </td>
                                <td>{question.category}</td>
                                <td>{question.complexity}</td>
                                <td><button id="deleteButton" onClick={() => deleteQuestion(question.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {isShowPopup && < DescriptionPopup qn={selectedQuestionDescription} idx={selectedQuestionId} toClose={toCloseDescriptionPopup} />}
            {/* <div className="questionDescription">
                {<DescriptionPopup qn={selectedQuestionDescription} idx={selectedQuestionId} />}
            </div> */}
            <div className="addQuestion">
                <AddQuestion toAddQuestion={toAddQuestion} />

            </div>
        </div>
    );
}

