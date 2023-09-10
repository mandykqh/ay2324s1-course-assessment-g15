import { useState } from "react";
import Question from "./Question";
export default function AddQuestion({ toAddQuestion }) {
    const [questionToAdd, setQuestionToAdd] = useState({
        title: '', description: '', category: '', complexity: 'Easy'
    });
    const handleSubmit = evt => {
        evt.preventDefault();
        const { title, description, category, complexity } = questionToAdd;
        const newQuestion = new Question(Math.random().toString(), title, description, category, complexity); // TODO fix rand id
        toAddQuestion(newQuestion);

        setQuestionToAdd({ id: "", title: "", description: "", category: "", complexity: "" });
    }
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setQuestionToAdd({ ...questionToAdd, [name]: value });
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
            <select id="complexity" name="complexity" value={questionToAdd.complexity} onChange={handleChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>

            </select>
            <button type="add">Add</button>
        </form >
    );
}