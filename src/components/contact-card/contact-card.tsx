import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './contact-card.module.scss';

interface ContactCardProperty {
  id: string;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

const ContactCard: React.FC<ContactCardProperty> = ({ id, first_name, last_name, job, description }) => {
  return (
    <div className={styles.contactCard}>
      <div className={styles.user}>
        <FontAwesomeIcon icon={faUser} />
        <span>{ last_name } { first_name}</span>
      </div>
      <ul>
        <li>
          <span className={styles.title}>Job</span>
          <span className={styles.value}>{ job }</span>
        </li>
        <li>
          <span className={styles.title}>Description</span>
          <span className={styles.value}>{ description }</span>
        </li>
      </ul>
    </div>
  );
};

export default ContactCard;