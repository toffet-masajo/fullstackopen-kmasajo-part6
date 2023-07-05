import { createSlice  } from '@reduxjs/toolkit';
import { addVote, createNew, getAll } from '../services/anecdoteService';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote (state, action) {
      return state.concat(action.payload);
    },
    upVote (state, action) {
      const toVote = state.find(anecdote => anecdote.id === action.payload);
      const itemIndex = state.indexOf(toVote);
      toVote.votes++;
      state[itemIndex] = toVote;
      return state;
    },
    setAnecdotes (state, action) {
      return action.payload;
    },
  }
});

export const { newAnecdote, upVote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await getAll();
    dispatch(setAnecdotes(data));
  };
};

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const data = await createNew(anecdote);
    dispatch(newAnecdote(data));
  };
};

export const increaseVote = (anecdote) => {
  return async dispatch => {
    const { id } = await addVote(anecdote);
    dispatch(upVote(id));
  };
};

export default anecdoteSlice.reducer;
