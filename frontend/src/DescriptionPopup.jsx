export default function DescriptionPopup({ qn, idx }) {
    console.log("Received questionDescription:", qn);

    return (
        <div>
            <h3>ID{idx + 1} Question description</h3>
            <p>{qn}</p>
        </div>
    )
}