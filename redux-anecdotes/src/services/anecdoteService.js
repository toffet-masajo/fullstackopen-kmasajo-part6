import axios from 'axios';

const DB_URL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const { data } = await axios.get(DB_URL);
  return data;
};

const createNew = async (content) => {
  const id = (100000 * Math.random()).toFixed(0);
  const object = { content, id, vote: 0 };
  const { data } = await axios.post(DB_URL, object);
  return data;
};

const addVote = async (content) => {
  const id = content.id;
  const { data } = await axios.put(`${DB_URL}/${id}`, content);
  return data;
};

export { getAll, createNew, addVote };
