import React from "react";
import CardSettings from "../Components/YourProfile/CardSettings";
import SidebarSettings from "../Components/YourProfile/SidebarSettings";
import CardProfile from "../Components/YourProfile/CardProfile";
import HeaderStats from "../Components/YourProfile/HeaderStats";
import AdminNavbar from '../Shared/Navbar/AdminNavbar';

function YourProfile() {
  const user = {
    username: "naadborole",
    email: "naad.borole2000@gmail.com",
    firstname: "Naad",
    lastname: "Borole",
    gender: "Male",
    dob: "2000-04-21",
    age: 21,
    state: "Maharashtra",
    country: "India",
    city: "Pune",
    profession: "Student",
    Institution: "Pune Institute of Computer Technology",
    addline1: "B-1301 ajcbohslnoac aoiscopisj aisjcopaj",
  };

  return (
    <>
      <AdminNavbar color="bg-transparent" />
      <SidebarSettings></SidebarSettings>
      <div className="relative md:ml-64 bg-blueGray-100">
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4">
              <CardSettings {...user} />
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <CardProfile {...user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourProfile;
