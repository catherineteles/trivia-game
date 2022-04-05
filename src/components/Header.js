import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getSavedRanking from '../helpers/getRank';

class Header extends React.Component {
  render() {
    const ranking = getSavedRanking();
    const { savedScore } = this.props;
    return (
      <header className="topnav" data-testid="header-component">
        <img src={ ranking.picture } alt="" datatestId="header-profile-picture" />
        <h1 className="title-nav">Trivia!</h1>
        <div className="text-container">
          <p data-testid="header-player-name">{ranking.name}</p>
          <p data-testid="header-score">
            {savedScore}
          </p>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  savedScore: state.player.score,
});

Header.propTypes = {
  savedScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
