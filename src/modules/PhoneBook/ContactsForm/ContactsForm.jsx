import { Component } from 'react';
import PropTypes from 'prop-types';
import inititalState from './inititalState';

import styles from './contacts-form.module.scss';

class ContactsForm extends Component {
  state = { ...inititalState };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props; // handleSubmit з this.props  забирає onSubmit
    const result = onSubmit({ ...this.state }); // в onSubmit передає свій state
    if (result) {
      this.reset();
    }
  };
  reset() {
    this.setState({ ...inititalState });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (
      <form onSubmit={handleSubmit} className={styles.formGroup}>
        <div className={styles.inputWrap}>
          <label>Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={name}
            placeholder="Add name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>

        <div className={styles.inputWrap}>
          <label htmlFor="">Number</label>
          <input
            onChange={handleChange}
            type="tel"
            name="number"
            value={number}
            placeholder="Add phone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          {' '}
          Add contact{' '}
        </button>
      </form>
    );
  }
}

export default ContactsForm;

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
