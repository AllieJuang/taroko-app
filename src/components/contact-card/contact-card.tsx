import { faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { useContact } from '../../redux/contact/contact-reducer';
import { useMedia } from '../../util/media';
import Button from '../button/button';
import ContactInfo from '../contact-info/contact-info';
import Modal from '../modal/modal';
import styles from './contact-card.module.scss';

export interface ContactCardProperty {
  id?: string;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

const ContactCard: React.FC<ContactCardProperty> = ({ id, first_name, last_name, job, description }) => {
  const [{ loading }, { deleteContact }] = useContact();
  const media = useMedia();

  const modalRef = useRef(null);
  
  const openContactModal = () => {
    if (modalRef.current) {
			(modalRef.current as any).open();
		}
  };

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
            <Button name="Edit" className="primary" action={() => openContactModal()} />
            <Button name="Delete" className="secondary" action={() => deleteContact(id)} />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faEdit}  onClick={() => openContactModal()} />
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteContact(id)} />
          </>
        )}
      </div>
      <Modal ref={modalRef}>
				<ContactInfo 
          id={id} 
          firstName={first_name} 
          lastName={last_name} 
          job={job} 
          description={description} 
          close={() => {
            if (modalRef.current) {
              (modalRef.current as any).close();
            }
        }} />
			</Modal>
    </div>
  );
};

export default ContactCard;