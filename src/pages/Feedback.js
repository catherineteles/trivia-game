import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { savedScore } = this.props;
    const minPoints = 3;
    return (
      <div>
        <Header />
        {savedScore < minPoints ? (
          <h3 data-testid="feedback-text">Could be better...</h3>)
          : <h3 data-testid="feedback-text">Well Done!</h3>}
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
