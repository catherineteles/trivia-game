import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  formatAnswers = ({ correct_answer: correct, incorrect_answers: incorrect }) => {
    const magicNumber = 0.5;
    const formated = incorrect.map((element, index) => (
      { label: element, type: `wrong-answer-${index}` }
    ));
    const newArray = [...formated, { label: correct, type: 'correct-answer' }];

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    return newArray.sort(() => Math.random() - magicNumber);
  }

  render() {
    const { result, disabledBtn } = this.props;
    const { category, question } = result;

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          { this.formatAnswers(result).map((e) => (
            <button
              type="button"
              data-testid={ e.type }
              key={ e.type }
              onClick={ () => 'f' }
              disabled={ disabledBtn }
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
}.isRequired;

export default Question;
