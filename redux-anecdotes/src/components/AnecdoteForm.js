import { useDispatch } from 'react-redux';

import { newAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { createNew } from '../services/anecdoteService';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  
  const create = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    const notification = `Added '${anecdote}'`
    event.target.anecdote.value = '';
    const data = await createNew(anecdote);
    dispatch(newAnecdote(data));
    dispatch(setNotification(notification));
    setTimeout(() => dispatch(setNotification('')), 5000);
  }
  
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;
