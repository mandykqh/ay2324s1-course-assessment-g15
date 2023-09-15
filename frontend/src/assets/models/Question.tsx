export default class Question {
    id: string;
    title: string;
    description: string;
    category: string;
    complexity: string;

    constructor(id: string, title: string, description: string, category: string, complexity: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.complexity = complexity;
    }
}