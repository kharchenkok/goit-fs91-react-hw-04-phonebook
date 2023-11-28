import React, { Component } from 'react';
import { showError, showWarning } from '../Utils/ToastNotification';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;
    const { isContactExist, onFormSubmit } = this.props;

    if (name.trim() === '' || number.trim() === '') {
      showError('Make sure all fields are completed!');
      return;
    }

    if (isContactExist(name)) {
      showWarning(`${name} is already in contacts!`);
      return;
    }

    onFormSubmit({ name, number });
    this.setState({ name: '', number: '' });
  };
  handleFormChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={'form'}>
        <label className={'form__label'}>
          Name
          <input
            type="text"
            name={'name'}
            value={name}
            required
            onChange={this.handleFormChange}
            className={'form__input'}
          />
        </label>
        <label className={'form__label'}>
          Phone number
          <input
            type="tel"
            value={number}
            name={'number'}
            required
            onChange={this.handleFormChange}
            className={'form__input'}
          />
        </label>

        <button type={'submit'}>Add contact</button>
      </form>
    );
  }
}
