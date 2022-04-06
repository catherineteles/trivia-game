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
      showNext: false,
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

    console.log(results.length, index);
    // if (results.length === (index + 2)) {
    //   this.setState({ finished: true });
    // }
    this.setState((state) => ({ index: state.index + 1 }), () => {
      if (results.length === (index + 2)) {
        this.setState({ showNext: false, finished: true });
      }
    });
  }

  showNextBtn = () => {
    const { showNext } = this.state;
    this.setState({ showNext: !showNext });
  }

  render() {
    const { results } = this.props;
    const { index, finished, showNext } = this.state;

    return (
      <div>
        <Header />
        { results.length > 0 && <Question
          showNextBtn={ this.showNextBtn }
          result={ results[index] }
        />}
        { finished
             && (
               <button
                 type="button"
                 onClick={ () => 'F' }
               >
                 Feedback
               </button>)}
        { showNext && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.handleClick }
          >
            Next
          </button>)}
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
