const INITIAL_STATE = {};

const token = (state = INITIAL_STATE, action) => {
  if (action.type === 'NEW_ACTION') {
    return { ...state, idk: action.payload };
  }

  return state;
};

export default token;
