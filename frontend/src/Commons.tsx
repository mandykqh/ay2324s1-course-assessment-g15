

interface QuestionString {
  id: string,
  title: string,
  complexity: string,
  categories: string,
  description: string,
  link: string
}

const questionStringTemplate = {
  id: '',
  title: '',
  categories: '',
  complexity: '',
  description: '',
  link: ''
}


export { questionStringTemplate };
export type { QuestionString };