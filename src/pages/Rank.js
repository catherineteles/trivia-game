import React from 'react';
import PropTypes from 'prop-types';

class Rank extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Rank</h1>
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
