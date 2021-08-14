import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header';
import ContactList from './pages/contact-list/contact-list';
import Home from './pages/home/home';



function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/contacts">
          <ContactList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
