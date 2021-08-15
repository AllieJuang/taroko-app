import React from 'react';
import styles from './home.module.css';

const Home: React.FC<{}> = () => (
  <div className={styles.home}>
    <h1>This is Home Page : )</h1>
    <p>Click Home Page on top-left to Contact List.  </p>
  </div>
);

export default Home;