import Category from "./enums/Category";
import Complexity from "./enums/Complexity";

function parseCategories(inputStringArr: string[]) {
  return inputStringArr.map((c) => Category[c as keyof typeof Category]);
}

function parseComplexity(inputString: string) {
  return Complexity[inputString as keyof typeof Complexity];
}

class Question {
  id: Number;
  title: string;
  categories: Category[];
  complexity: Complexity;
  link: string;
  description: string;

  constructor(id: Number, title: string, categories: string[], complexity: string, link: string, description: string) {
    this.id = id;
    this.title = title;
    this.categories = parseCategories(categories);
    this.complexity = parseComplexity(complexity);
    this.link = link;
    this.description = description;
  }

  public getCategoriesString() {
    return this.categories.map((c) => Category[c]).join(', ');
  }

  public getComplexityString() {
    return Complexity[this.complexity];
  }
}

export default Question;
