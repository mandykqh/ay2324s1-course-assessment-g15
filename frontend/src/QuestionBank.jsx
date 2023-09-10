import { useState, useEffect } from "react";
import AddQuestion from "./AddQuestion";
export default function QuestionBank() {
    const [questions, setQuestions] = useState([]);
    const toAddQuestion = newQuestion => setQuestions([...questions, newQuestion]);

    useEffect(() => {
        const loadedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
        console.log("Loaded Questions:", loadedQuestions);
        if (loadedQuestions.length > 0) {
            setQuestions(loadedQuestions);
        }
    }, []);

    useEffect(() => {
        console.log("Saving Questions:", questions);
        localStorage.setItem("questions", JSON.stringify(questions));
    }, [questions]);
    return (
        <div>
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
                            <td>{question.title}</td>
                            <td>{question.category}</td>
                            <td>{question.complexity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddQuestion toAddQuestion={toAddQuestion} />
        </div>
    );
}

