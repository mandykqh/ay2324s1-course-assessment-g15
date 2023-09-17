import Category from "./models/enums/Category";
import Complexity from "./models/enums/Complexity";

function enumToString(e: unknown[]) {
  return e.slice(0, e.length / 2);
}

function getComplexityStrings() {
  return enumToString(Object.values(Complexity)) as string[];
}

function getCategoriesString() {
  return enumToString(Object.values(Category)) as string[];
}

export { getComplexityStrings, getCategoriesString };