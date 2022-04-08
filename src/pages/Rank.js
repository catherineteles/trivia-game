import React from 'react';
import PropTypes from 'prop-types';
import RankCard from '../components/RankCard';
import { getSavedRanking } from '../services/getRank';

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      rank: [],
    };
  }

  componentDidMount() {
    const rank = getSavedRanking();
    this.setState({ rank });
  }

  render() {
    const { history } = this.props;
    const { rank } = this.state;
    return (
      <div className="container">
        <h1 data-testid="ranking-title" className="ranking-title">Rank</h1>
        { rank.length !== 0 && rank.sort((a, b) => b.score - a.score)
          .map((player, index) => (
            <li key={ player.name }>
              <RankCard
                name={ player.name }
                score={ player.score }
                img={ player.picture }
                index={ index }
              />
            </li>
          ))}
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
