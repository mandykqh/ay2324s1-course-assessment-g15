import { questionSet } from "../MockData";
import QuestionTable from "../question/QuestionTable";

const QuestionPage = () => {
  return (
    <QuestionTable
      data={questionSet}
      isDeleting={false}
      viewDescriptionHandler={(id: string) => { }}
      deleteHandler={(id: string) => { }}
    />
  );
}

export default QuestionPage;