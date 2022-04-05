import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import thunkToken from '../redux/actions/thunkToken';
// import newAction from '../redux/actions/index';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabledBtn: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = async () => {
    const { email } = this.state;
    const { getToken, history } = this.props;

    await getToken(email);
    history.push('/play');
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      const { name: nome, email } = this.state;

      const isAbled = nome && email !== '';
      this.setState({ disabledBtn: !isAbled });
    });
  }

  render() {
    const { name, email, disabledBtn } = this.state;

    return (
      <div>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Type your name"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Type your e-mail"
            data-testid="input-gravatar-email"
          />
        </label>
        <input
          type="button"
          value="Play"
          data-testid="btn-play"
          disabled={ disabledBtn }
          onClick={ this.handleClick }
        />
        <Link to="/settings">
          <input
            type="button"
            value="Edit"
            data-testid="btn-settings"
          />
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: async (email) => dispatch(await thunkToken(email)),
  // dispatchAction: (type, value) => dispatch(newAction(type, value)),
});

Login.propTypes = {
  getToken: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
