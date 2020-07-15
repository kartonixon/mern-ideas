import React from 'react'

function IdeaCard(props) {
    const [upvotes, setUpvotes] = React.useState(props.upvotes);

    function handleUpvote() {
        setUpvotes(upvotes + 1)
        props.onUpvote(props.id, props.content, upvotes)
    }

    function handleDownvote() {
        setUpvotes(upvotes - 1)
        props.onDownvote(props.id, props.content, upvotes)
    }

    function handleDelete() {
        props.onDelete(props.id)
    }

    return (
        <div style={{ border: "1px solid black", textAlign: "center", width: "300px" }}>
            <h2 style={ upvotes < 0 ? {opacity: 0.3} : null}>{props.content}</h2>
            <p>{upvotes}</p>
            <button onClick={handleDownvote}>-1</button>
            <button onClick={handleUpvote}>+1</button>
            { upvotes < 0 && <button onClick={handleDelete}>Delete</button> }
        </div>
    )

}

export default IdeaCard