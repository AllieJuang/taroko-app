import React, { useEffect } from 'react';
import { useContact } from '../../redux/contact/contact-reducer';

const ContactList: React.FC<{}> = () => {
  const [{ contacts }, { getContacts }] = useContact();


  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    console.log(contacts)
  }, [contacts]);
  
  return (
    <h1>ContactList</h1>
  )
};

export default ContactList;