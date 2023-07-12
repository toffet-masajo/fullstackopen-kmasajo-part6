import { useMutation, useQuery, useQueryClient } from 'react-query';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, voteAnecdote } from './components/api';
import { useNotificationDispatch } from './components/NotificationContext';

const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const votedAnecdoteMutation = useMutation(
    voteAnecdote,
    {
      onSuccess: (votedAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes');
        queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => {
          if(anecdote.id === votedAnecdote.id)
            return { ...anecdote, votes: anecdote.votes+1 };
          return anecdote;
        }));
        dispatch({ type: 'NEW_MESSAGE', payload: `anecdote ${votedAnecdote.content} voted`});
      },
      onError: ({ response }) => dispatch({ type: 'NEW_MESSAGE', payload: `${response.data.error}`}),
      onSettled: () => setTimeout(() => dispatch({ type: 'CLEAR_MESSAGE' }), 5000)
    }
  );

  const handleVote = (anecdote) => {
    votedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes+1 });
  };

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    { retry: false, refetchOnWindowFocus: false }
  );

  if(result.isLoading) return <div>loading data...</div>;
  if(result.isError) return <div>anecdote service not available due to problems in server</div>;

  const anecdotes = result.data;

  return (
    <div>

      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
  );
};

export default App;
