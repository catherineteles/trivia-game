const INITIAL_STATE = { score: 0, assertions: 0 };

const token = (state = INITIAL_STATE, action) => {
  if (action.type === 'USER_IMG') {
    return { ...state, userImg: action.payload };
  }

  if (action.type === 'USER_NAME') {
    return { ...state, name: action.payload };
  }

  if (action.type === 'USER_EMAIL') {
    return { ...state, gravatarEmail: action.payload };
  }

  if (action.type === 'ADD_SCORE') {
    const newScore = state.score + action.payload;
    return { ...state, score: newScore };
  }

  if (action.type === 'NEW_ANSWER') {
    const newLog = [...state.log, action.payload];
    return { ...state, log: newLog };
  }

  return state;
};

export default token;
