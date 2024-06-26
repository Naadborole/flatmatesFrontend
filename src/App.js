import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./tailwind.css";
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
import MyProfile from "./Pages/MyProfile";
import Footer from "./Shared/Footer/Footer"
import './Shared/Background/StarryNight.css'
// components

function App() {
  return (
    <AuthProvider>
    <Router>
      <NavbarAlt style={{position:"fixed"}}></NavbarAlt>
      <div className = 'back'>
        <Switch>
          <Route path='/' exact component={Home} ></Route>
          <Route path = '/login' exact component = {Login}></Route>
          {/* <PrivateRoute path="/mc" exact component={YourProfile} /> */}
          <Route path = "/test" exact component = {Test}/>
          <Route path = "/register" exact component = {Register}/>
          <Route path = "/ImgComp" exact component = {ImgComp}/>
          <Route path = "/CreatePost" exact component = {CreatePost}/>
          <Route path = "/Description/:id" exact component = {Description}/>
          <Route path = "/MyPost" exact component = {MyPost}/>
          <Route path = "/UpdatePost" exact component = {UpdatePost}/>
          <Route path = "/MyProfile" exact component = {MyProfile}/>
        </Switch>
      </div>
      <Footer/>
    </Router>
    </AuthProvider>
  );
}

export default App;
