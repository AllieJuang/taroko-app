import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header';
import { AppPath } from './constants/app-path.const';
import ContactList from './pages/contact-list/contact-list';
import Home from './pages/home/home';



function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={AppPath.home}>
          <Home />
        </Route>
        <Route path={AppPath.contacts}>
          <ContactList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
