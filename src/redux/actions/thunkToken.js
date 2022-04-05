import fetchTokens from '../../services/fetchToken';

const recieveToken = (token) => ({
  type: 'GET_TOKEN',
  token,
});

const thunkToken = (email) => async (dispatch) => {
  const token = await fetchTokens(email);
  dispatch(recieveToken(token));
};

export default thunkToken;
