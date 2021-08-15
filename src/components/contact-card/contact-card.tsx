import { faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMedia } from '../../util/media';
import Button from '../button/button';
import styles from './contact-card.module.scss';

export interface ContactCardProperty {
  id?: string;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

const ContactCard: React.FC<ContactCardProperty> = ({ id, first_name, last_name, job, description }) => {
  const media = useMedia();

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
      <div className={styles.btns}>
        {media !== 'mobile' ? (
          <>
            <Button name="Edit" className="primary" action={() => console.log('123')} />
            <Button name="Delete" className="secondary" action={() => console.log('123')} />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faEdit} />
            <FontAwesomeIcon icon={faTrash} />
          </>
        )}
      </div>
    </div>
  );
};

export default ContactCard;