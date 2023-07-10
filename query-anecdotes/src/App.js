import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {

  const getAnecdotes = () => {
    return axios
      .get('http://localhost:3001/anecdotes')
      .then(res => res.data)
  }

  const createAnecdote = ( newAnecdote ) => {
    return axios
      .post('http://localhost:3001/anecdotes', newAnecdote)
      .then(res => res.data);
  }

  const voteAnecdote = ( anecdote ) => {
    return axios
      .put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
      .then(res => res.data);
  }

  const queryClient = useQueryClient();
  const votedAnecdoteMutation = useMutation(
    voteAnecdote,
    {
      onSuccess: () => queryClient.invalidateQueries('anecdotes')
    }
  )

  const handleVote = (anecdote) => {
    votedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes+1 });
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    { retry: false }
  );

  if(result.isLoading) return <div>loading data...</div>;
  if(result.isError) return <div>anecdote service not available due to problems in server</div>

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm createAnecdote={createAnecdote}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
