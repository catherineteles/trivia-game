import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import thunkQuestion from '../redux/actions/thunkQuestion';
import Header from '../components/Header';
import Question from '../components/Question';
import { addPlayer } from '../services/getRank';
import Timer from '../components/Timer';
import './Play.css';

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      timer: undefined,
      showNext: false,
      answered: false,
      controlAnswers: false,
    };
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  handleClick = () => {
    this.showNextBtn();
    const { results } = this.props;
    const { index } = this.state;

    if (results.length === (index + 1)) {
      addPlayer(this.getPlayerRank());
      const { history } = this.props;
      return history.push('/feedback');
    }

    this.setState((state) => (
      { index: state.index + 1,
        answered: false,
        controlAnswers: false }
    ));
  }

  getPlayerRank = () => {
    const { savedName, savedImg, savedScore } = this.props;
    return { name: savedName, score: savedScore, picture: savedImg };
  }

  showNextBtn = () => {
    const { showNext } = this.state;
    this.setState({ showNext: !showNext, answered: true });
  }

  getTimer = (time) => {
    this.setState({ timer: time }, () => {
      const { timer, showNext } = this.state;
      if (timer === 0) {
        this.setState({ controlAnswers: true, showNext: !showNext });
      }
    });
  }

  render() {
    const { results } = this.props;
    const { index, answered, showNext, timer, controlAnswers } = this.state;

    return (
      <>
        <Header />
        <main>
          <div className="play-container">
            <Timer
              answered={ answered }
              getTimer={ this.getTimer }
              key={ index }
            />
            { results.length > 0 && <Question
              showNextBtn={ this.showNextBtn }
              answered={ answered }
              result={ results[index] }
              timer={ timer !== undefined && timer }
              index={ index }
              controlAnswers={ controlAnswers }
            />}
            { (showNext || timer === 0) && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.handleClick }
              >
                Next
              </button>)}
          </div>
        </main>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    results: state.questions,
    savedScore: state.player.score,
    savedImg: state.player.userImg,
    savedName: state.player.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getQuestions: (token) => dispatch(thunkQuestion(token)),
  };
}

Play.propTypes = {
  token: PropTypes.string,
  results: PropTypes.array,
  getQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Play);
