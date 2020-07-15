import React from 'react';
import axios from 'axios'
import IdeaCard from './IdeaCard'
import InputArea from './InputArea'

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
    axios.get('http://localhost:5000/ideas/')
      .then(response => {
        setIdeas(response.data)
      })
    console.log(ideas)
  };

  const upvoteIdea = (id, content, upvotes) => {
    axios.post(`http://localhost:5000/ideas/update/${id}`, {
      content: content,
      upvotes: upvotes + 1
      })
      .then(res => {
        console.log(res);
        fetchData();
        
      })
      .catch(err => console.log(err))
  }

  const downvoteIdea = (id, content, upvotes) => {
    axios.post(`http://localhost:5000/ideas/update/${id}`, {
      content: content,
      upvotes: upvotes - 1
      })
      .then(res => {
        console.log(res);
        fetchData();
        
      })
      .catch(err => console.log(err))
  }

  const deleteIdea = (id) => {
    setIdeas(ideas.filter(idea => idea._id !== id))
    axios.delete(`http://localhost:5000/ideas/delete/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const shareIdea = (idea) => {
    const newIdea = { content: idea }
    axios.post(`http://localhost:5000/ideas/add`, newIdea)
      .then(res => {
        console.log(res);
        fetchData();
      })
      .catch(err => console.log(err))
  }
  
  return (
    <div>
      <h1>DZIEN DOBRY</h1>
      <InputArea onShare={shareIdea} />
      <button onClick={() => window.location.reload()}>Refresh</button>
      <button onClick={() => setSortBy('createdAt')} style={sortBy==='createdAt' ? { pointerEvents: "none", opacity: 0.3 } : null}>Newest</button>
      <button onClick={() => setSortBy('upvotes')} style={sortBy==='upvotes' ? { pointerEvents: "none", opacity: 0.3 } : null}>Most upvoted</button>
      {ideas.map(idea => <IdeaCard key={idea._id} id={idea._id} content={idea.content} upvotes={idea.upvotes} onUpvote={upvoteIdea} onDownvote={downvoteIdea} onDelete={deleteIdea}/>)}
    </div>
    
  );
}

export default App;
