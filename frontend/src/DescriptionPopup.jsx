export default function DescriptionPopup({ qn }) {
    console.log("Received questionDescription:", qn);

    return (
        <div>
            <h3>Question description</h3>
            <p>{qn}</p>
        </div>
    )
}