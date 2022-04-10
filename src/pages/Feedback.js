import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { savedScore, savedAssertion, history } = this.props;
    const minPoints = 3;
    return (
      <div>
        <Header />
        <main>
          <h2 data-testid="feedback-total-score">{savedScore}</h2>
          <h2 data-testid="feedback-total-question">{savedAssertion}</h2>
          {savedAssertion < minPoints ? (
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
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedScore: state.player.score,
  savedAssertion: state.player.assertions,
});

Feedback.propTypes = {
  savedScore: PropTypes.number,
  savedAssertion: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
