import { UseToastOptions } from "@chakra-ui/toast";
import Category from "./models/enums/Category";
import Complexity from "./models/enums/Complexity";
import { NotificationOptions } from "./Commons";
import { useEffect } from "react";
import AuthRequestHandler from "./handlers/AuthRequestHandler";

function enumToString(e: unknown[]) {
  return e.slice(0, e.length / 2);
}

export function getComplexityStrings() {
  return enumToString(Object.values(Complexity)) as string[];
}

export function getCategoriesString() {
  return enumToString(Object.values(Category)) as string[];
}

export function stringToOptionsMapper(input: string) {
  if (input.length === 0) {
    return [];
  }
  return input.split(', ').map((value: string) => ({
    value: value,
    label: value
  }));
}

function showNotification(options: NotificationOptions, toast: (options: UseToastOptions) => {}) {
  toast({
    title: options.type === 'success' ? 'Success' : 'Error',
    description: options.message,
    status: options.type,
    duration: 3000,
    isClosable: true,
  })
}

export function showSuccess(message: string, toast: (options: UseToastOptions) => {}) {
  showNotification({ message: message, type: 'success' }, toast);
}

export function showError(message: string, toast: (options: UseToastOptions) => {}) {
  showNotification({ message: message, type: 'error' }, toast);
}

export function authChecker(setIsAuthenticated: React.Dispatch<React.SetStateAction<null>>) {
  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => { setIsAuthenticated(res.isAuth); })
      .catch(e => { console.log("Error: " + e.message); });
  }, []);
}
