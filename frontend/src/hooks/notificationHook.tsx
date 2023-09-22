import { UseToastOptions } from "@chakra-ui/react";
import { useEffect } from "react";
import { NotificationOptions } from "../Commons";

export function notificationHook(options: NotificationOptions, toast: (options: UseToastOptions) => {}) {
  useEffect(() => {
    if (options.message.length === 0) {
      return;
    }
    toast({
      title: options.type === 'success' ? 'Success' : 'Error',
      description: options.message,
      status: options.type,
      duration: 3000,
      isClosable: true,
    })
  }, [options.message]);
}