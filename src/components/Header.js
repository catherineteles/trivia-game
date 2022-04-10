import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  render() {
    // const ranking = getSavedRanking();
    const { savedImg, savedName, savedScore } = this.props;
    return (
      <header className="topnav" data-testid="header-component">
        <img src={ savedImg } alt="" data-testid="header-profile-picture" />
        <p className="title-nav">Trivia!</p>
        <div className="text-container">
          <p data-testid="header-player-name">{savedName}</p>
          <p data-testid="header-score">
            {savedScore}
          </p>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  savedImg: state.player.userImg,
  savedName: state.player.name,
  savedScore: state.player.score,
  // savedEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  savedImg: PropTypes.string.isRequired,
  savedName: PropTypes.string.isRequired,
  savedScore: PropTypes.number.isRequired,
  // savedEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
