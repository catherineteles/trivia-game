import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import thunkQuestion from '../redux/actions/thunkQuestion';
import Header from '../components/Header';
import Question from '../components/Question';
import Timer from '../components/Timer';

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      timer: undefined,
      showNext: false,
      answered: false,
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
      this.setState({ showNext: false });
      const { history } = this.props;
      return history.push('/feedback');
    }

    this.setState((state) => (
      { index: state.index + 1,
        answered: false,
        controlAnswers: false }
    ));
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

  resetTimer = () => {
    console.log('oi');
  }

  render() {
    const { results } = this.props;
    const { index, answered, showNext, timer, controlAnswers } = this.state;

    return (
      <div>
        <Header />
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

        <Timer
          answered={ answered }
          getTimer={ this.getTimer }
          key={ index }
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    results: state.questions,
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
