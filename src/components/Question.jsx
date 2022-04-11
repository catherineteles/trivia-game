import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import newAction from '../redux/actions/index';
import images from '../services/image';

const he = require('he');

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
    // simulação da key - conversa com Du Pedroso
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

  render() {
    const { result, answered, timer, controlAnswers } = this.props;
    const { category, question } = result;
    const { answers } = this.state;
    const categoryImg = images.find((e) => e.category === category);
    // Por surgestão da Luá utilizamos o he.decode()
    // https://github.com/mathiasbynens/he

    return (
      <>
        <div className="question-container">
          <p data-testid="question-category">{ category }</p>
          <h4 data-testid="question-text">{ he.decode(question) }</h4>
        </div>
        <img
          src={ categoryImg ? categoryImg.src : images[0].src }
          alt={ category }
          className="category-img"
        />
        <div data-testid="answer-options" className="answer-options">
          { answers && answers.map((e) => (
            <button
              type="button"
              data-testid={ e.type }
              key={ e.type }
              name={ e.type }
              value={ e.label }
              className={ answered ? e.type.split('-')[0] : '' }
              disabled={ timer === 0 ? controlAnswers : answered }
              onClick={ this.handleClick }
            >
              { he.decode(e.label) }
            </button>
          )) }
        </div>
      </>
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
