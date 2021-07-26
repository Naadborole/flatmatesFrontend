import React, { useState } from "react";
import background from "../assets/img/register_bg_2.png";
import { Link } from "react-router-dom";
import app from "../firebase";
import { useEffect } from "react";
import { ForgotPassword } from "../Shared/ForgotPassword";

export default function Login({history}) {
    const [user,setUser] = useState();
    const [Email, setEmail] = useState('');
    //const user = app.auth().currentUser;
 
    const handleformSubmit = React.useCallback(
      async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
            
          setUser(app.auth().currentUser);

          app.auth().onAuthStateChanged((user) => {
            if (user) {
              if (user.emailVerified === false) {
                alert("Email is not verified!");
                app.auth().signOut();
              }
              else
                history.push("/");
            }
          });
        } catch (error) {
          alert(error);
        }
      },
      [history]
    );

    

  return (
    <>
      <section className="relative w-full h-full pt-36 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{ backgroundImage: "url(" + background + ")" }}
        ></div>

        <div className="container mx-auto px-4 h-full -mt-20">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-12 py-10 py-5">
                  <div className="text-5xl font-semibold uppercase text-center">
                    Login
                  </div>
                  <form className="flex flex-col" onSubmit={handleformSubmit}>
                    <div className="relative w-full mb-3 py-4">
                      <label
                        className="block uppercase text-blueGray-600 text-md font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        name="email"
                        id="Email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                      />
                    </div>

                    <div className="relative w-full mb-3 py-4">
                      <label
                        className="block uppercase text-blueGray-600 text-md font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        name="password"
                      />
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-md font-semibold text-blueGray-600">
                          Remember me
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-6 w-6/12 self-center">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-md font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={()=> ForgotPassword(Email)}
                    className="text-blueGray-200"
                    id="forgotpassword"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/register" className="text-blueGray-200">
                    <small>Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
