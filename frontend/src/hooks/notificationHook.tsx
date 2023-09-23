import { UseToastOptions } from "@chakra-ui/react";
import { useEffect } from "react";
import { NotificationOptions } from "../Commons";

export function showNotification(options: NotificationOptions, toast: (options: UseToastOptions) => {}) {
  toast({
    title: options.type === 'success' ? 'Success' : 'Error',
    description: options.message,
    status: options.type,
    duration: 3000,
    isClosable: true,
  })
}