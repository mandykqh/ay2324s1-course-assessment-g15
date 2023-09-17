import { NotificationType } from "./components/question/Notification";

interface QuestionString {
  id: string,
  title: string,
  complexity: string,
  categories: string,
  description: string,
  link: string
}

interface notificationState {
  isShowing: boolean,
  message: string,
  type: NotificationType
}

const questionStringTemplate = {
  id: '',
  title: '',
  categories: '',
  complexity: '',
  description: '',
  link: ''
}

const initialNotificationState = {
  isShowing: false,
  message: '',
  type: NotificationType.SUCCESS
}

export { questionStringTemplate, initialNotificationState };
export type { notificationState, QuestionString };