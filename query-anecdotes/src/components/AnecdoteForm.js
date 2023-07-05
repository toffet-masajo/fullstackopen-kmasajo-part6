import { useMutation, useQueryClient } from "react-query";

const AnecdoteForm = ({ createAnecdote }) => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(
    createAnecdote,
    {
      onSuccess: () => queryClient.invalidateQueries('anecdotes')
    }
    );

  const generateId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, id: generateId() });
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
