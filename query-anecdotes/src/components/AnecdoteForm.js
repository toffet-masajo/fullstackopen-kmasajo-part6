import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "./api";
import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation(
    createAnecdote,
    {
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes');
        queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      }
    }
    );

  const generateId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, id: generateId(), votes: 0 });
    dispatch({ type: 'NEW_MESSAGE', payload: `anecdote ${content} created`});
    setTimeout( () => dispatch({ type: 'CLEAR_MESSAGE' }), 5000);
 }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
