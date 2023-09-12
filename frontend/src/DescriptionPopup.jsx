export default function DescriptionPopup({ qn, idx, toClose }) {
    console.log("Received questionDescription:", qn);

    return (
        <div>
            <h3>ID{idx + 1} Question description</h3>
            <p>{qn}</p>
            <button onClick={toClose}>Close</button>
        </div>
    )
}