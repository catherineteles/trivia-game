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
    const orderedRank = rank.sort((a, b) => b.score - a.score);
    return (
      <>
        <table className="container">
          <thead>
            <tr>
              <td data-testid="ranking-title">Rank</td>
            </tr>
          </thead>
          <tbody>
            { rank.length !== 0 && orderedRank
              .map((player, index) => (
                <tr key={ index }>
                  <RankCard
                    name={ player.name }
                    score={ player.score }
                    img={ player.picture }
                    index={ index }
                  />
                </tr>
              ))}
          </tbody>
        </table>
        <div className="btn-rank-page">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
        </div>
      </>
    );
  }
}

Rank.propTypes = {
  history: PropTypes.objectOf(),
}.isRequired;

export default Rank;
