import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import wellDone from '../images/wellDone.svg';
import doBetter from '../images/doBetter.svg';
import './Feedback.css';

class Feedback extends React.Component {
  render() {
    const { savedScore, savedAssertion, history } = this.props;
    const minPoints = 3;
    return (
      <div>
        <Header />
        <main className="feedback-container">
          <h3>
            Your total score is:
            <span data-testid="feedback-total-score">
              {savedScore}
            </span>
          </h3>
          <h4>
            You answered
            <span data-testid="feedback-total-question">
              {savedAssertion}
            </span>
            questions correct
          </h4>
          {savedAssertion < minPoints ? (
            <>
              <img src={ doBetter } alt="Sad face" />
              <h5 data-testid="feedback-text">Could be better...</h5>
            </>)
            : (
              <>
                <img src={ wellDone } alt="Well Done" />
                <h5 data-testid="feedback-text">Well Done!</h5>
              </>)}
          <div className="btn-container">
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
