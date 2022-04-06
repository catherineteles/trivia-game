import fetchTokens from '../../services/fetchToken';

const recieveToken = (token) => ({
  type: 'GET_TOKEN',
  token,
});

const thunkToken = () => async (dispatch) => {
  const token = await fetchTokens();
  dispatch(recieveToken(token));
};

export default thunkToken;
