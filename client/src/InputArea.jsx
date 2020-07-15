import React from 'react'

const MAX_IDEA_LENGTH = 69;

function InputArea(props) {
    const [newIdea, setNewIdea] = React.useState("");
    const [charsLeft, setCharsLeft] = React.useState(MAX_IDEA_LENGTH);

    function handleChange(event) {
        const text = event.target.value
        setNewIdea(text)
        setCharsLeft(MAX_IDEA_LENGTH - newIdea.length)
    }

    function handleShare() {
        if (newIdea.length > MAX_IDEA_LENGTH) {
            alert('sorry, too long')
        } else if (newIdea.length > 5) {
            props.onShare(newIdea.substring(0,MAX_IDEA_LENGTH))
            setNewIdea("");
            setCharsLeft(MAX_IDEA_LENGTH)
        } else {
            alert('nop, too short')
        }
    }

    return (
        <div>
            <input value={newIdea} onChange={handleChange}/>
            <span>{charsLeft} chars left</span>
            <button onClick={handleShare}>Share!!!</button>
        </div>
    )
}

export default InputArea