const INITIAL_STATE = { score: 0, assertions: 0 };

const token = (state = INITIAL_STATE, action) => {
  if (action.type === 'USER_IMG') {
    return { ...state, userImg: action.payload };
  }

  if (action.type === 'USER_NAME') {
    return { ...state, name: action.payload, score: 0 };
  }

  if (action.type === 'USER_EMAIL') {
    return { ...state, gravatarEmail: action.payload, assertions: 0 };
  }

  if (action.type === 'ADD_SCORE') {
    const newScore = state.score + action.payload;
    return { ...state, score: newScore };
  }

  if (action.type === 'ADD_ASSERTION') {
    const newAssertion = state.assertions + action.payload;
    return { ...state, assertions: newAssertion };
  }

  if (action.type === 'CLEAR_SCORE') {
    const newScore = action.payload;
    return { ...state, score: newScore, assertions: newScore };
  }

  return state;
};

export default token;
