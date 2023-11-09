export interface QuestionString {
  id: string,
  title: string,
  complexity: string,
  categories: string[],
  description: string,
  link: string
}

export const emptyQuestionString: QuestionString = {
  id: '',
  title: '',
  categories: [],
  complexity: '',
  description: '',
  link: ''
}

export interface UserDataString {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface HistoryDataString {
  userId: string;
  attempt: {
    questionId: string;
    timestamp: string;
  };
  complexity: string;
}

export interface MatchingString {
  complexity: string;
  categories: string[]; // To be changed into [] after assignment 5
}

export const emptyMatchingString: MatchingString = {
  complexity: '',
  categories: [], // To be changed into [] after assignment 5
}

export interface MatchDataString {
  user_id: string;
  other_user: string;
  question: QuestionString;
  room_id: number;
}

export interface NotificationOptions {
  message: string;
  type: 'success' | 'error'
}

export interface Attempt {
  questionId: string;
  timestamp: string;
};

export interface ChatMessage {
  sender: string;
  text: string;
};

export interface ChatProps {
  messages: ChatMessage[];
  newMessage: string;
  onNewMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: () => void;
};