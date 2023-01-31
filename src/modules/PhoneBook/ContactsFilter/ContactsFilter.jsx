import styles from './contacts-filter.module.scss';
import PropTypes from 'prop-types';

const ContactsFilter = ({ handleChange }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="">Find contacts by name</label>
      <input
        type="text"
        onChange={handleChange}
        name="filter"
        placeholder="Find contacts"
      />
    </div>
  );
};

export default ContactsFilter;

ContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
