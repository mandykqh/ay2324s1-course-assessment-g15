import { useState, useEffect } from "react";
import AddQuestion from "./AddQuestion";
import ToggleDescription from "./ToggleDescription";
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
        // localStorage.setItem("questions", JSON.stringify(questions));
    }, [questions]);


    const [selectedQuestionDescription, setSelectedQuestionDescription] = useState("");
    const [isShowPopup, setIsShowPopup] = useState(false);
    const togglePopup = (questionDescription) => {
        setSelectedQuestionDescription(questionDescription);
        setIsShowPopup(!isShowPopup);
        console.log(`this is set: ${selectedQuestionDescription}`);
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
                                    <button onClick={() => togglePopup(question.description)}>{question.title}</button>
                                    {console.log("Description:", question.description)}
                                </td>
                                <td>{question.category}</td>
                                <td>{question.complexity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {/* {isShowPopup && < ToggleDescription description={selectedQuestionDescription} />} */}
            <div className="questionDescription">
                {/* {isShowPopup && <ToggleDescription qn={selectedQuestionDescription} />} */}
                <h4>Question description</h4>
                {isShowPopup && selectedQuestionDescription}
            </div>
            <div className="addQuestion">
                <AddQuestion toAddQuestion={toAddQuestion} />

            </div>
        </div>
    );
}

