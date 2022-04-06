import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const minScore = 3;
    const { savedScore } = this.props;
    return (
      <div>
        <Header />
        { savedScore < minScore ? (
          <h2 data-testid="feedback-text">Could be better...</h2>)
          : (<h2 data-testid="feedback-text">Well Done!</h2>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  savedScore: state.player.score,
});

Feedback.propTypes = {
  savedScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
