export default function ToggleDescription({ questionDescription }) {
    console.log("Received questionDescription:", questionDescription);

    return (
        <div>
            <h3>Question description</h3>
            <p>{questionDescription}</p>
        </div>
    )
}