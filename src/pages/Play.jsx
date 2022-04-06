import React from 'react';
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
    };
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;

    getQuestions(token);
  }

  handleClick = () => {
    const { results } = this.props;
    const { index } = this.state;

    console.log(results.length, index);
    // if (results.length === (index + 2)) {
    //   this.setState({ finished: true });
    // }
    this.setState((state) => ({ index: state.index + 1 }) , () => {
      if (results.length === (index + 2)) {
        this.setState({ finished: true });
      }
    });
  }

  render() {
    const { results } = this.props;
    const { index, finished } = this.state;

    return (
      <div>
        <Header />
        { results.length > 0 && <Question result={ results[index] } />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Play);
