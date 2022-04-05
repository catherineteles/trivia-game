const ranking = 'ranking';

if (!JSON.parse(localStorage.getItem(ranking))) {
  localStorage.setItem(ranking, JSON.stringify([{ name: '',
    score: 0,
    picture: 'url-da-foto-no-gravatar' }]));
}

const getSavedRanking = () => JSON.parse(localStorage.getItem(ranking));

export default getSavedRanking;
