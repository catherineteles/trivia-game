const INITIAL_STATE = { score: 0 };

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

  if (action.type === 'NEW_ANSWER') {
    const newScore = state.score + action.payload;
    return { ...state, score: newScore };
  }

  return state;
};

export default token;
