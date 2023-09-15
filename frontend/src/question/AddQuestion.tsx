import { useState } from "react";
import { Question } from "../models/Question";
export default function AddQuestion({ questions, toAddQuestion }) {

    const [questionToAdd, setQuestionToAdd] = useState({
        title: '', description: '', category: '', complexity: ''
    });
    const handleSubmit = evt => {
        evt.preventDefault();
        const { title, description, category, complexity } = questionToAdd;
        // const newQuestion = new Question(existingQuestions.length + 1, title, description, category, complexity); // TODO fix rand id
        const newQuestion = new Question(Math.random().toString(), title, description, category, complexity); // TODO fix rand id
        if (checkDuplicateQuestion(newQuestion)) {
            alert("This question already exists in the question bank!");
        } else {
            toAddQuestion(newQuestion);
            setQuestionToAdd({ id: "", title: "", description: "", category: "", complexity: "" });
        }

    }
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setQuestionToAdd({ ...questionToAdd, [name]: value });
    };

    const checkDuplicateQuestion = qnToAdd => {
        return questions.some(qn =>
            qn.title === qnToAdd.title &&
            qn.description === qnToAdd.description &&
            qn.category === qnToAdd.category &&
            qn.complexity === qnToAdd.complexity
        );
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Add question</h2>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={questionToAdd.title} onChange={handleChange} required />

            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={questionToAdd.description} onChange={handleChange} required />

            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" value={questionToAdd.category} onChange={handleChange} required />

            <label htmlFor="complexity">Complexity</label>
            <select id="complexity" name="complexity" value={questionToAdd.complexity} onChange={handleChange} required>
                <option value="" disabled>Select an option</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>

            </select>
            <button id="addButton">Add</button>
        </form >
    );
}