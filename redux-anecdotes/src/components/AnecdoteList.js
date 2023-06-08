import { useSelector, useDispatch } from 'react-redux';
import { upVote } from '../reducers/anecdoteReducer';

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

  const vote = (id) => dispatch(upVote(id));

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;
