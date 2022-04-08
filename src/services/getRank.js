const ranking = 'ranking';

if (!JSON.parse(localStorage.getItem(ranking))) {
  localStorage.setItem(ranking, JSON.stringify([]));
}

const saveItens = (savedItens) => localStorage
  .setItem(ranking, JSON.stringify(savedItens));

export const getSavedRanking = () => JSON.parse(localStorage.getItem(ranking));

export const addPlayer = (player) => {
  const savedPlayers = getSavedRanking();
  saveItens([...savedPlayers, player]);
};
