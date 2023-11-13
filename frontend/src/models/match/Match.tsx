class Match {
    user_id: string;
    categories: string[];
    complexity: string;

    constructor(user_id: string, categories: string[], complexity: string) {
        this.user_id = user_id;
        this.categories = categories;
        this.complexity = complexity;
    }
}

export default Match;
