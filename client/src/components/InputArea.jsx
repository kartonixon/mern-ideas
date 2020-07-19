import React from 'react'

import { Button, Box, Grid, TextField, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

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
            alert('Please, keep it short and clear!')
        } else if (newIdea.length > 5) {
            props.onShare(newIdea.substring(0,MAX_IDEA_LENGTH))
            setNewIdea("");
            setCharsLeft(MAX_IDEA_LENGTH)
        } else {
            alert('Please, share more details!')
        }
    }

    return (
        <Box m={3} p={1}>
            <Grid container>
                <Grid item xs={12} >
                    <TextField fullWidth="true" label="Your briliant idea" value={newIdea} onChange={handleChange}/>
                    <Typography variant="overline" display="block" gutterBottom>{charsLeft} chars left</Typography> 
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleShare} startIcon={<AddIcon />}>Add your idea</Button>
                </Grid>
            </Grid>
        </Box>
        
    )
}

export default InputArea