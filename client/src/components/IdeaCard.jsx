import React from 'react'

import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function IdeaCard(props) {
    const [upvotes, setUpvotes] = React.useState(props.upvotes);

    function handleUpvote() {
        setUpvotes(upvotes + 1);
        props.onUpvote(props.id, props.content, upvotes);
    }

    function handleDownvote() {
        setUpvotes(upvotes - 1);
        props.onDownvote(props.id, props.content, upvotes);
    }

    function handleDelete() {
        props.onDelete(props.id);
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3}>
                <Box m={1} p={2}>
                    <Box p={2}>
                        <Typography variant="h5" component="h2">
                            {props.content}
                        </Typography>
                    </Box>

                    <Box p={2}>
                        <Typography variant="h5" component="h3" display="inline" style={{fontWeight: "600"}}>
                            {upvotes} {upvotes === 1 || upvotes === -1  ? "point" : "points"}
                        </Typography>
                    </Box>

                    <Box p={2}>
                        <Button size="small" variant="contained" color="primary" onClick={handleUpvote}><ExpandLessIcon /></Button>
                        &nbsp;
                        <Button size="small" variant="contained" color="primary" onClick={handleDownvote}><ExpandMoreIcon /></Button>
                    </Box>
                    
                    { upvotes < 0 && <Button size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button> }
                </Box>
            </Paper>
        </Grid>
    )
}

export default IdeaCard;