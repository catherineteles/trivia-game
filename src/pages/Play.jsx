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
      timer: 0,
      showNext: false,
      answered: false,
    };
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;

    getQuestions(token);
    // this.clockProgress();
  }

  handleClick = () => {
    this.showNextBtn();
    const { results } = this.props;
    const { index } = this.state;

    // this.clockProgress();

    if (results.length === (index + 1)) {
      this.setState({ showNext: false });
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState((state) => (
      // { index: state.index + 1, answered: false, clock: 30 }
      { index: state.index + 1, answered: false }
    ));
  }

  // clockProgress = () => {
  //   const interval = 1000;

  //   const increase = setInterval(() => this.setState((state) => {
  //     if (!state.clock || state.answered) {
  //       clearInterval(increase);
  //       return { answered: true, showNext: true };
  //     }
  //     return { clock: state.clock - 1 };
  //   }), interval);
  // }

  showNextBtn = () => {
    const { showNext } = this.state;
    this.setState({ showNext: !showNext, answered: true });
  };

  getTimer = (time) => {
    console.log(time);
    this.setState({ timer: time });
  };

  render() {
    const { results } = this.props;
    const { index, answered, showNext, timer } = this.state;

    return (
      <div>
        <Header />
        { results.length > 0 && <Question
          showNextBtn={ this.showNextBtn }
          answered={ answered }
          result={ results[index] }
          timer={ timer }
        />}
        { showNext && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClick }
          >
            Next
          </button>)}
        {/* <p>{ clock }</p> */}
        <Timer
          answered={ answered }
          showNext={ showNext }
          getTimer={ this.getTimer }
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
