import React from 'react';
import PropTypes from 'prop-types';

class RankCard extends React.Component {
  render() {
    const { img, name, score, index } = this.props;
    return (
      <div className="ranking-item">
        <figure className="ranking-image">
          <img src={ img } alt="" className="ranking-thumbnail" />
          <span className="ranking-badge">{ index + 1 }</span>
        </figure>
        <div className="ranking-card">
          <div
            data-testid={ `player-name-${index}` }
            className="ranking-name"
          >
            { name }
          </div>
          <p data-testid={ `player-score-${index}` } className="ranking-score">
            { score }
          </p>
        </div>
      </div>
    );
  }
}

RankCard.propTypes = {
  score: PropTypes.number,
  index: PropTypes.number,
  name: PropTypes.string,
  img: PropTypes.string,
}.isRequired;

export default RankCard;
