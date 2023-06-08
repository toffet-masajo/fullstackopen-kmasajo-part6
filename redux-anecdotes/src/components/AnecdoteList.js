import { useSelector, useDispatch } from 'react-redux';
import { upVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  
  const anecdotes = useSelector(({ anecdotes, filter }) => 
    anecdotes.filter(
      anecdote => 
        anecdote.content
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    );

  const vote = (id) => {
    const anecdote = anecdotes.find(item => item.id === id);
    const notification = `you voted '${anecdote.content}'`;

    dispatch(upVote(id));
    dispatch(setNotification(notification));
    setTimeout(() => dispatch(setNotification('')), 5000);
  };

  const compareFn = (a, b) => {
    if(a.votes > b.votes) return -1;
    if(a.votes < b.votes) return 1;
    return 0;
  };

  return(
    <div>
      {anecdotes
        .sort(compareFn)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default AnecdoteList;
