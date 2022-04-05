const INITIAL_STATE = {};

const token = (state = INITIAL_STATE, action) => {
  if (action.type === 'GET_TOKEN') {
    return action.token;
  }

  return state;
};

export default token;
