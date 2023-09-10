export default function AddQuestion() {
    const handleSubmit = evt => evt.preventDefault();

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add question</h2>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />

            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" required />

            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" required />

            <label htmlFor="complexity">Complexity</label>
            <select id="complexity" name="complexity">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>

            </select>
            <button type="submit">Submit</button>
        </form>
    );
}