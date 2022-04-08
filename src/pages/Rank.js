import React from 'react';
import PropTypes from 'prop-types';
import RankCard from '../components/RankCard';
import { getSavedRanking } from '../services/getRank';

class Rank extends React.Component {
  render() {
    const { history } = this.props;
    const rank = getSavedRanking();
    return (
      <div className="container">
        <h1 data-testid="ranking-title" className="ranking-title">Rank</h1>
        <ul className="ranking-list">
          { rank.length !== 0 && rank.sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <li key={ index }>
                <RankCard
                  name={ player.name }
                  score={ player.score }
                  img={ player.picture }
                  index={ index }
                />
              </li>
            ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

Rank.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Rank;
