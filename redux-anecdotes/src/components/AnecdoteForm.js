import { connect } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();
  
  const create = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    const notification = `Added '${anecdote}'`
    event.target.anecdote.value = '';
    // dispatch(createAnecdote(anecdote));
    // dispatch(setNotification(notification, 5));
    props.createAnecdote(anecdote);
    props.setNotification(notification, 5);
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

// export default AnecdoteForm;
export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm);
