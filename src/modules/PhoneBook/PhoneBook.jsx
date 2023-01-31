import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import styles from './phone-book.module.scss';

class PhoneBook extends Component {
  state = {
    items: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };
  removeContact(id) {
    this.setState(({ items }) => {
      const NewContacts = items.filter(item => item.id !== id);
      return { items: NewContacts };
    });
  }
  addContact = e => {
    e.preventDefault();
    const { name } = this.state;
    if (this.isDublicate(name)) {
      //   return alert(` ${name} is already in contacts`);
      return Notify.warning(` ${name} is already in contacts`);
    }
    this.setState(prevState => {
      const { name, number, items } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { items: [newContact, ...items], name: '', number: '' };
    });
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { items } = this.state;
    const contact = items.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(contact);
  }
  getFilteredContacts() {
    const { filter, items } = this.state;
    if (!filter) {
      return items;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = items.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }
  render() {
    const { addContact, handleChange } = this; // з this дістаємо метод класу addContact,...
    const { name, number } = this.state;
    const items = this.getFilteredContacts();

    const contacts = items.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}{' '}
        <button onClick={() => this.removeContact(id)} type="button">
          Delete
        </button>
      </li>
    ));
    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h2 className={styles.title}>Phonebook</h2>
            <form action="" onSubmit={addContact}>
              <div className={styles.formGroup}>
                <label htmlFor="">Name</label>
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

              <div className={styles.formGroup}>
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
              <button type="submit"> Add contact </button>
            </form>
          </div>
          <div className={styles.block}>
            <h2 className={styles.title}>Contacts</h2>
            <div className={styles.formGroup}>
              <label htmlFor="">Find contacts by name</label>
              <input
                onChange={handleChange}
                name="filter"
                placeholder="Find contacts"
              />
            </div>
            <ol>{contacts}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneBook;
