import { UseToastOptions } from "@chakra-ui/toast";
import Category from "./models/enums/Category";
import Complexity from "./models/enums/Complexity";
import { NotificationOptions } from "./Commons";

function enumToString(e: unknown[]) {
  return e.slice(0, e.length / 2);
}

function getComplexityStrings() {
  return enumToString(Object.values(Complexity)) as string[];
}

function getCategoriesString() {
  return enumToString(Object.values(Category)) as string[];
}

function stringToOptionsMapper(input: string) {
  if (input.length === 0) {
    return [];
  }
  return input.split(', ').map((value: string) => ({
    value: value,
    label: value
  }));
}

export function showNotification(options: NotificationOptions, toast: (options: UseToastOptions) => {}) {
  toast({
    title: options.type === 'success' ? 'Success' : 'Error',
    description: options.message,
    status: options.type,
    duration: 3000,
    isClosable: true,
  })
}

export { getComplexityStrings, getCategoriesString, stringToOptionsMapper };