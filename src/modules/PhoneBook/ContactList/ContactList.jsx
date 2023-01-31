import PropTypes from 'prop-types';

import styles from './contact-list.module.scss';

const ContactList = ({ removeContact, items }) => {
  const contacts = items.map(({ id, name, number }) => (
    <li className={styles.item} key={id}>
      {name}: {number}{' '}
      <button
        className={styles.btn}
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return <ol className={styles.list}>{contacts}</ol>;
};

export default ContactList;

ContactList.defaultProps = {
  items: [],
};

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
