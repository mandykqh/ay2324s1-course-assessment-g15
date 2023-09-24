

interface QuestionString {
  id: string,
  title: string,
  complexity: string,
  categories: string[],
  description: string,
  link: string
}

const questionStringTemplate: QuestionString = {
  id: '',
  title: '',
  categories: [],
  complexity: '',
  description: '',
  link: ''
}

interface UserDataString {
  id: string;
  username: string;
  email: string;
}

interface NotificationOptions {
  message: string;
  type: 'success' | 'error'
}

export { questionStringTemplate };
export type { QuestionString, NotificationOptions, UserDataString };