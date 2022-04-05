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

  return state;
};

export default token;
