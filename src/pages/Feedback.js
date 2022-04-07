import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getSavedRanking } from '../services/getRank';

class Feedback extends React.Component {
  render() {
    const { savedScore, history } = this.props;
    const minPoints = 3;
    const { assertions } = getSavedRanking();
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-total-score">{savedScore}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        {savedScore < minPoints ? (
          <h3 data-testid="feedback-text">Could be better...</h3>)
          : <h3 data-testid="feedback-text">Well Done!</h3>}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/rank') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedScore: state.player.score,
});

Feedback.propTypes = {
  savedScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
