import React, { Component } from 'react';

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
      <form action="">
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
        />
      </form>
    );
  }
}

export default Login;
