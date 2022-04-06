import getAsk from '../../services/getAsk';

const getQuestions = (type, payload) => ({ type, payload });

export default (token) => async (dispatch) => getAsk(token)
  .then((results) => dispatch(getQuestions('GET_QUESTIONS', results)));
