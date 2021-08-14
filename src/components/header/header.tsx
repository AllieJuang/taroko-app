import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppPath } from '../../constants/app-path.const';
import Button from '../button/button';
import styles from './header.module.scss';


const Header: React.FC<{}> = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const addContact = () => {
    console.log('add')
  }
  
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
    </div>
  );
}

export default Header;