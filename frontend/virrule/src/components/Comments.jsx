import "../styles/Comments.css";

let commentIndex = 0;

function Comments() {
    const comments = [
        "hodi da rabotish",
        "emi nqqsh pari",
        "tui sh zabogateesh be smeshen",
        "pruc",
    ];

    const currentComment = comments[commentIndex % comments.length];
    commentIndex++;

    return (
        <div className="comment">
            <h2>Comments</h2>
            <p>{currentComment}</p>
        </div>
    );
}

export default Comments;