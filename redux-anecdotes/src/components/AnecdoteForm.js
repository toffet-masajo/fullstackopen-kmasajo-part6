import { useDispatch } from "react-redux";

import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  
  const create = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    const notification = `Added '${anecdote}'`
    event.target.anecdote.value = '';
    dispatch(newAnecdote(anecdote));
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
