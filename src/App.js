import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./tailwind.css";
import YourProfile from "./Pages/YourProfile";
import Home from "./Pages/Home";
import NavbarAlt from "./Shared/Navbar/NavbarAlt";
import Form from "./Shared/ExtraForms/form";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";
// components

function App() {
  return (
    <AuthProvider>
    <Router>
      <NavbarAlt></NavbarAlt>
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path = '/login' exact component = {Login}></Route>
        <PrivateRoute path="/mc" exact component={YourProfile} />
        <Route path = "/test" exact component = {Form}/>
        <Route path = "/register" exact component = {Register}/>
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
