import "./DescriptionPopup.css";
import Question from "./Question";

interface Props {
    qn: Question;
    idx: number;
    toClose: (qn: Question, idx: number) => {}
}

const DescriptionPopup: React.FC<Props> = ({ qn, idx, toClose }) => {
    return (
        <div className="descriptionPopup">
            <div className="content">
                <h3 className="title">ID{idx + 1} {qn.title}</h3>
                <h4 className="complexity">{qn.complexity}</h4>
                <p>{qn.description}</p>
                <button onClick={() => toClose(qn, idx)}>Close</button>
            </div>
        </div >
    )
}

export default DescriptionPopup;