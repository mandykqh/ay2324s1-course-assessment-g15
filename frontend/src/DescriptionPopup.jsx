import "./DescriptionPopup.css";
export default function DescriptionPopup({ qn, idx, toClose }) {
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