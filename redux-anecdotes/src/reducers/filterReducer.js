export const applyFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  };
};

const reducer = (state = '', action) => {
  // console.log('state now: ', state);
  // console.log('action', action);
  
  const { type, payload } = action;
  
  switch(type) {
    case 'SET_FILTER':
      return payload;
    default : return state;
  };
};

export default reducer;
