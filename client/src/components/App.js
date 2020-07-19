import React from 'react';
import axios from 'axios'
import IdeaCard from './IdeaCard'
import InputArea from './InputArea'
import Header from './Header'

import { Button, Box, Container, Grid, Typography } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'

function App() {
  const [ideas, setIdeas] = React.useState([]);
  const [sortBy, setSortBy] = React.useState('createdAt');

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const sortArray = type => {
      const sortProperty = type;
      let ideasCopy = [...ideas]
      if (sortProperty === 'createdAt') {
        ideasCopy = ideasCopy.sort((a, b) => {
          if (a[sortProperty] < b[sortProperty])
            return 1;
          if (a[sortProperty] > b[sortProperty])
            return -1;
          return 0;
        });
      } else {
        ideasCopy = ideasCopy.sort((a, b) => b[sortProperty] - a[sortProperty]);
      }
      setIdeas(ideasCopy);
    };

    sortArray(sortBy);
  }, [sortBy]);

  const fetchData = () => {
    axios.get('https://mern-ideas.herokuapp.com/ideas/')
      .then(response => {
        setIdeas(response.data)
      })
    console.log(ideas)
  };

  const upvoteIdea = (id, content, upvotes) => {
    axios.post(`https://mern-ideas.herokuapp.com/ideas/update/${id}`, {
      content: content,
      upvotes: upvotes + 1
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }

  const downvoteIdea = (id, content, upvotes) => {
    axios.post(`https://mern-ideas.herokuapp.com/ideas/update/${id}`, {
      content: content,
      upvotes: upvotes - 1
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }

  const deleteIdea = (id) => {
    setIdeas(ideas.filter(idea => idea._id !== id))
    axios.delete(`https://mern-ideas.herokuapp.com/ideas/delete/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const shareIdea = (idea) => {
    const newIdea = { content: idea }
    axios.post(`https://mern-ideas.herokuapp.com/ideas/add`, newIdea)
      .then(res => {
        console.log(res);
        fetchData();
      })
      .catch(err => console.log(err))
  }
  
  return (
    <Container maxWidth="md" align="center">
      <Box m={2}>
        <Header />
      </Box>
      
      <InputArea onShare={shareIdea} />

      <Grid container>
        <Grid item sm={12} md={6}>
            <Typography variant="h4" style={{float: "left"}}>
                Ideas Library
            </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box style={{float: "right"}}>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={() => window.location.reload()}>Refresh</Button>
            &nbsp; &nbsp;
            <Button variant="contained" onClick={() => setSortBy('createdAt')} style={sortBy==='createdAt' ? { pointerEvents: "none", opacity: 0.3 } : null}>Newest</Button>
            &nbsp; &nbsp;
            <Button variant="contained" onClick={() => setSortBy('upvotes')} style={sortBy==='upvotes' ? { pointerEvents: "none", opacity: 0.3 } : null}>Most upvoted</Button>
          </Box>
        </Grid>
      </Grid>
      <hr style={{color:"gray"}} />

      <Grid container spacing={3}>
        {ideas.map(idea => <IdeaCard key={idea._id} id={idea._id} content={idea.content} upvotes={idea.upvotes} onUpvote={upvoteIdea} onDownvote={downvoteIdea} onDelete={deleteIdea}/>)}
      </Grid>
    </Container>
  );
}

export default App;
