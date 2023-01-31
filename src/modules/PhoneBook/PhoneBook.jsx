import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactList/ContactList';
import ContactsFilter from './ContactsFilter/ContactsFilter';

import items from './ContactsFilter/items';

import styles from './phone-book.module.scss';

class PhoneBook extends Component {
  state = {
    items: [...items],
    filter: '',
  };
  removeContact = id => {
    this.setState(({ items }) => {
      const NewContacts = items.filter(item => item.id !== id);
      return { items: NewContacts };
    });
  };
  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      //   return alert(` ${name} is already in contacts`);
      Notify.warning(` ${name} is already in contacts`);
      return false;
    }
    this.setState(prevState => {
      const { items } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { items: [newContact, ...items] };
    });
    return true;
  };
  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
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
    const { addContact, removeContact, handleFilter } = this; // з this дістаємо метод класу addContact,...
    const items = this.getFilteredContacts();
    const isContacts = Boolean(items.length);

    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h2 className={styles.title}>Phonebook</h2>
            <ContactsForm onSubmit={addContact} />
          </div>
          <div className={styles.block}>
            <h2 className={styles.title}>Contacts</h2>
            <ContactsFilter handleChange={handleFilter} />
            {isContacts && (
              <ContactList removeContact={removeContact} items={items} />
            )}
            {!isContacts && <p className={styles.notif}>No contacts in list</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneBook;
