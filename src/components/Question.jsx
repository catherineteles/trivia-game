import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newAction from '../redux/actions/index';
// import Timer from './Timer';

// quando eu clico na resposta, ele randomiza elas dnv
class Question extends Component {
  constructor() {
    super();
    this.state = {
      answers: [],
    };
  }

  componentDidMount() {
    const { result } = this.props;
    const options = this.formatAnswers(result);
    this.setState({ answers: options });
  }

  componentDidUpdate(prevProps) {
    // simulação da key
    const { index } = this.props;
    if (index !== prevProps.index) {
      const { result } = this.props;
      const options = this.formatAnswers(result);
      this.setState({ answers: options });
    }
  }

  formatAnswers = ({ correct_answer: correct, incorrect_answers: incorrect }) => {
    const magicNumber = 0.5;
    const formated = incorrect.map((element, index) => (
      { label: element, type: `wrong-answer-${index}` }
    ));
    const newArray = [...formated, { label: correct, type: 'correct-answer' }];

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    return newArray.sort(() => Math.random() - magicNumber);
  }

  handleClick = ({ target }) => {
    target.className = 'selected';
    const isCorrect = target.name.split('-')[0] === 'correct';

    const { result, dispatchAction, showNextBtn, timer } = this.props;
    // const { timer } = this.state;
    const { difficulty } = result;
    const magicNum = 3;
    const isItHard = difficulty === 'hard' ? magicNum : 1;
    const multiplyBy = difficulty === 'medium' ? 2 : isItHard;

    const dez = 10;
    const score = isCorrect ? (dez + (timer * multiplyBy)) : 0;
    const assertion = isCorrect ? 1 : 0;
    showNextBtn();
    dispatchAction('ADD_ASSERTION', assertion);
    dispatchAction('ADD_SCORE', score);
  }

  // getTimer = (time) => {
  //   console.log(time);
  //   this.setState({ timer: time });
  // };

  render() {
    console.log('question');
    const { result, answered, timer } = this.props;
    // const { timer } = this.state;
    const { category, question } = result;
    const { answers } = this.state;

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options" className="answer-options">
          { answers && answers.map((e) => (
            <button
              type="button"
              data-testid={ e.type }
              key={ e.type }
              name={ e.type }
              value={ e.label }
              className={ answered ? e.type.split('-')[0] : '' }
              disabled={ timer === 0 ? true : answered }
              onClick={ this.handleClick }
            >
              { e.label }
            </button>
          )) }
        </div>
        {/* <Timer
          answered={ answered }
          showNextBtn={ showNextBtn }
          getTimer={ this.getTimer }
        /> */}
      </div>
    );
  }
}

Question.propTypes = {
  result: PropTypes.arrayOf(),
  dispatchAction: PropTypes.func,
  showNextBtn: PropTypes.func,
  timer: PropTypes.number,
}.isRequired;

function mapDispatchToProps(dispatch) {
  return {
    dispatchAction: (type, payload) => dispatch(newAction(type, payload)),
  };
}

export default connect(null, mapDispatchToProps)(Question);
