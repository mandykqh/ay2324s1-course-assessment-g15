

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


export const emptyQuestionString: QuestionString = {
  id: '',
  title: '',
  categories: [],
  complexity: '',
  description: '',
  link: ''
}

interface NotificationOptions {
  message: string;
  type: 'success' | 'error'
}

export { questionStringTemplate };
export type { QuestionString, NotificationOptions };