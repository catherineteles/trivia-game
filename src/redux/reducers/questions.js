export default (state = [], action) => {
  if (action.type === 'GET_QUESTIONS') {
    return action.payload;
  }
  if (action.type === 'NEW_GAME') {
    return [];
  }
  return state;
};
