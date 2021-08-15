import { faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import ContactCard from '../../components/contact-card/contact-card';
import { useContact } from '../../redux/contact/contact-reducer';
import styles from './contact-list.module.scss';

type sortType = 'ASC' | 'DESC'

const ContactList: React.FC<{}> = () => {
  const [{ loading, contacts }, { getContacts }] = useContact();
  const [sort, setSort] = useState<sortType>('ASC');
  const sortedContacts = useMemo(() => contacts.sort(
    (a, b) => sort === 'ASC' ? 
      a.first_name.localeCompare(b.first_name) :
      b.first_name.localeCompare(a.first_name)
  ), [sort, contacts]);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className={styles.contactList}>
      <h1>Contacts</h1>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <>
          <div className={styles.list}>
            {sortedContacts.map(contact => <ContactCard key={contact.id} {...contact} />)}
          </div>
          <FontAwesomeIcon icon={ sort === 'ASC'? faSortAlphaDown : faSortAlphaUp } className={styles.sort} onClick={() => {
            const action = sort === 'ASC' ? 'DESC' : 'ASC';
            setSort(action);
          }} />
        </>
      )}
    </div>
  );
};

export default ContactList;
