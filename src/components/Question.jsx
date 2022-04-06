import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newAction from '../redux/actions/index';

// quando eu clico na resposta, ele randomiza elas dnv
class Question extends Component {
  constructor() {
    super();

    this.state = {
      options: undefined,
    };
  }

  componentDidMount() {
    const { result } = this.props;
    const options = this.formatAnswers(result);
    this.setState({ options });
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

    const { result, dispatchAction, showNextBtn } = this.props;
    const { difficulty } = result;
    const magicNum = 3;
    const isItHard = difficulty === 'hard' ? magicNum : 1;
    const multiplyBy = difficulty === 'medium' ? 2 : isItHard;

    const dez = 10;
    const timer = 1;
    const score = isCorrect ? (dez + (timer * multiplyBy)) : 0;

    showNextBtn();
    dispatchAction('NEW_ANSWER', score);
  }

  render() {
    const { result, answered } = this.props;
    const { category, question } = result;
    const { options } = this.state;

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options" className="answer-options">
          { options && options.map((e) => (
            <button
              type="button"
              data-testid={ e.type }
              key={ e.type }
              name={ e.type }
              className={ answered ? e.type.split('-')[0] : '' }
              disabled={ answered }
              onClick={ this.handleClick }
            >
              { e.label }
            </button>
          )) }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  result: PropTypes.arrayOf(),
  dispatchAction: PropTypes.func,
  showNextBtn: PropTypes.func,
}.isRequired;

function mapDispatchToProps(dispatch) {
  return {
    dispatchAction: (type, payload) => dispatch(newAction(type, payload)),
  };
}

export default connect(null, mapDispatchToProps)(Question);
