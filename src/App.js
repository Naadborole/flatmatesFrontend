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
import Test from "./Pages/Test";
import ImgComp from "./Components/ImgComp";
import CreatePost from "./Pages/CreatePost";
import Description from "./Pages/Description"
import MyPost from "./Pages/MyPost";
import UpdatePost  from "./Pages/UpdatePost";
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
        <Route path = "/test" exact component = {Test}/>
        <Route path = "/register" exact component = {Register}/>
        <Route path = "/ImgComp" exact component = {ImgComp}/>
        <Route path = "/CreatePost" exact component = {CreatePost}/>
        <Route path = "/Description/:id" exact component = {Description}/>
        <Route path = "/MyPost" exact component = {MyPost}/>
        <Route path = "/UpdatePost" exact component = {UpdatePost}/>
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
