import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.clockProgress();
  }

  clockProgress = () => {
    this.setState({ timer: 30 });
    const interval = 1000;
    const increase = setInterval(() => this.setState((state) => {
      const { answered, getTimer } = this.props;
      if (!state.timer || answered) {
        clearInterval(increase);
        return getTimer(state.timer);
      }
      return { timer: state.timer - 1 };
    }), interval);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>{ timer }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  answered: PropTypes.bool,
  showNextBtn: PropTypes.func,
  getTimer: PropTypes.func,
}.isRequired;

export default Timer;
