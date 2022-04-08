import React from 'react';
import PropTypes from 'prop-types';

class RankCard extends React.Component {
  render() {
    const { img, name, score, index } = this.props;
    return (
      <>
        <th>{ index + 1 }</th>
        <td>
          <img src={ img } alt="" className="ranking-thumbnail" />
        </td>
        <td
          data-testid={ `player-name-${index}` }
          className="ranking-name"
        >
          { name }
        </td>
        <td data-testid={ `player-score-${index}` } className="ranking-score">
          { score }
        </td>
      </>
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
