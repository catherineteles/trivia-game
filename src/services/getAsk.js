export default (token) => (
  fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then(({ results }) => results)
    .catch((error) => console.log('Não foi possível obter as perguntas: ', error))
);
