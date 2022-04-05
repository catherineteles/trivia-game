import fetchTokens from '../../services/fetchToken';

const recieveToken = (token) => ({
  type: 'GET_TOKEN',
  token,
});

export default thunkToken = (email) => async (dispatch) => {
  const token = await fetchTokens(email);
  dispatch(recieveToken(token));
};
