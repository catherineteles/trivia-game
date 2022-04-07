import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import thunkQuestion from '../redux/actions/thunkQuestion';
import Header from '../components/Header';
import Question from '../components/Question';

class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      finished: false,
      clock: 0,
      disabledBtn: false,
    };
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;

    getQuestions(token);
    this.clockProgress();
  }

  handleClick = () => {
    const { results } = this.props;
    const { index } = this.state;

    this.clockProgress();

    this.setState((state) => (
      { index: state.index + 1, disabledBtn: false, clock: 0 }
    ), () => {
      if (results.length === (index + 2)) {
        this.setState({ finished: true });
      }
    });
  }

  clockProgress = () => {
    const interval = 1000;
    const magicNumber = 30;

    const increase = setInterval(() => this.setState((state) => {
      if (state.clock < magicNumber) {
        return { clock: state.clock + 1 };
      }
      clearInterval(increase);
      return { clock: 0, disabledBtn: true };
    }), interval);
  }

  render() {
    const { results } = this.props;
    const { index, finished, clock, disabledBtn } = this.state;

    return (
      <div>
        <Header />
        {
          results.length > 0
          && <Question
            disabledBtn={ disabledBtn }
            result={ results[index] }
          />
        }
        {
          finished
            ? (
              <button
                type="button"
                onClick={ () => 'F' }
              >
                Feedback
              </button>)
            : (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Next
              </button>)
        }
        <p>{ clock }</p>
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
