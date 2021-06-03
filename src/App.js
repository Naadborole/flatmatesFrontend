import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminNavbar from './Shared/Navbar/AdminNavbar'
import './App.css';
import YourProfile from './Pages/YourProfile'

function App() {
  return (
    <Router>
        
        <Switch>
          {/* <Route path='/' exact component={Home} /> */}
          <Route path='/mc' exact component={YourProfile} />
        </Switch>
      </Router>
  );
}

export default App;
