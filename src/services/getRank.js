const ranking = 'ranking';

if (!JSON.parse(localStorage.getItem(ranking))) {
  localStorage.setItem(ranking, JSON.stringify([{ name: '',
    score: 0,
    assertions: 0,
    picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' }]));
}

const saveItens = (savedItens) => localStorage
  .setItem(ranking, JSON.stringify(savedItens));

export const getSavedRanking = () => JSON.parse(localStorage.getItem(ranking));

export const addItemLocal = (key, item) => {
  const savedObject = getSavedRanking();
  saveItens([{ ...savedObject, [key]: item }]);
};
