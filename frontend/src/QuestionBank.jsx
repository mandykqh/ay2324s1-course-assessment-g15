import { useState, useEffect } from "react";
import AddQuestion from "./AddQuestion";
import DescriptionPopup from "./DescriptionPopup";
export default function QuestionBank() {
    const [questions, setQuestions] = useState([]);
    const toAddQuestion = newQuestion => setQuestions([...questions, newQuestion]);

    useEffect(() => {
        const loadedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
        // console.log("Loaded Questions:", loadedQuestions);
        if (loadedQuestions.length > 0) {
            setQuestions(loadedQuestions);
        }
    }, []);

    useEffect(() => {
        console.log("Saving Questions:", questions);
        localStorage.setItem("questions", JSON.stringify(questions));
    }, [questions]);


    const [selectedQuestionDescription, setSelectedQuestionDescription] = useState("");
    // const [isShowPopup, setIsShowPopup] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState("");

    const togglePopup = (questionDescription, questionId) => {
        setSelectedQuestionDescription(questionDescription);
        // setIsShowPopup(!isShowPopup);
        setSelectedQuestionId(questionId);

        console.log(`this is set: ${selectedQuestionDescription}`);
    }

    // const deleteQuestion = (toDeleteQnId) => {
    //     const remainingQuestions = questions.splice(toDeleteQnId, 0);
    //     setQuestions(remainingQuestions);
    //     localStorage.setItem("questions", JSON.stringify(remainingQuestions));
    // }
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
                                    <button onClick={() => togglePopup(question.description, id)}>{question.title}</button>
                                    {console.log("Description:", question.description)}
                                </td>
                                <td>{question.category}</td>
                                <td>{question.complexity}</td>
                                <td><button id="deleteButton" onClick={() => deleteQuestion(id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {/* {isShowPopup && < ToggleDescription description={selectedQuestionDescription} />} */}
            <div className="questionDescription">
                {/* {isShowPopup && <DescriptionPopup qn={selectedQuestionDescription} />} */}
                {<DescriptionPopup qn={selectedQuestionDescription} idx={selectedQuestionId} />}
            </div>
            <div className="addQuestion">
                <AddQuestion existingQuestions={questions} toAddQuestion={toAddQuestion} />

            </div>
        </div>
    );
}

