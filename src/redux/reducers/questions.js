export default (state = [], action) => (
  (action.type === 'GET_QUESTIONS')
    ? action.payload
    : state
);
