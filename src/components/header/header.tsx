import React, { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppPath } from '../../constants/app-path.const';
import Button from '../button/button';
import ContactInfo from '../contact-info/contact-info';
import Modal from '../modal/modal';
import styles from './header.module.scss';


const Header: React.FC<{}> = () => {
  const { pathname } = useLocation();
  const modalRef = useRef(null);
  
  const addContact = () => {
    if (modalRef.current) {
			(modalRef.current as any).open();
		}
  };
  return (
    <div className={styles.header}>
      <div>
        {
          pathname === AppPath.home ? (
            <NavLink className={styles.navi} to={AppPath.contacts} exact>Home Page</NavLink>
          ) : (
            <NavLink className={styles.navi} to={AppPath.home} exact>Contact List</NavLink>
          )
        }
      </div>
        {
          pathname === AppPath.contacts && (
            <Button name="Add Contact" className="primary" action={addContact} />
          )
        }
      <Modal ref={modalRef}>
				<ContactInfo close={() => {
          if (modalRef.current) {
            (modalRef.current as any).close();
          }
        }} />
			</Modal>
    </div>
  );
};

export default Header;
