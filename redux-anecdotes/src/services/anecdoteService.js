import axios from 'axios';

const DB_URL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const { data } = await axios.get(DB_URL);
  return data;
};

export { getAll };
