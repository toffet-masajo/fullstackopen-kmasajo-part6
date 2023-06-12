import { createSlice  } from '@reduxjs/toolkit';
import { getAll } from '../services/anecdoteService';

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


export default anecdoteSlice.reducer;
