import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAll } from './services/anecdoteService';
import { setAnecdotes } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  const notification = useSelector(state => state.notification);

  return (
    <div>
      <h2>Anecdotes</h2>
      { notification && <Notification /> }
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
