import "./DescriptionPopup.css";
export default function DescriptionPopup({ qn, idx, toClose }) {
    console.log("Received questionDescription:", qn);

    return (
        <div className="descriptionPopup">
            <div className="content">
                <h3>ID{idx + 1} Question description</h3>
                <p>{qn}</p>
                <button onClick={toClose}>Close</button>
            </div>
        </div>
    )
}