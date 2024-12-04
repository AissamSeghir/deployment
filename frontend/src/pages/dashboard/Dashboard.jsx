import React, { useState } from "react";
import "./menu.css";
import Profile from "/profile.png";
import Homedash from "../../components/homDashboard/Homedash";
import FormRessource from "../../components/forms/AddRessource";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {  useNavigate } from "react-router-dom";
import ProfileUser from "../../components/profile/ProfileUser";
function Dashboard({authUser}) {
  const [activeTab, setActiveTab] = useState("home");

  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("https://deployment-z54s.onrender.com/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to logout !");

        if (data.error) throw new Error(data.error);

        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      //refetch the authUser query to update the UI
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate('/login')
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  const showHomeDash = () => {
    setActiveTab("home");
  };
  return (
    <div className="dash">
      <div className="menu">
        <ul>
          <li className="profile"
            onClick={()=>{
              setActiveTab('profile')
            }}>
            <div className="img-box">
              <img src={Profile} alt="profile" />
            </div>
            <h2>{authUser.firstname}</h2>
          </li>
          <li>
            <a
              onClick={() => {
                setActiveTab("home");
              }}
            >
              <i className="fa-solid fa-house"></i>
              <h2>Home</h2>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActiveTab("add-ressource");
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <h2>Add Resource</h2>
            </a>
          </li>
          <li className="loug-out">
            <a
              onClick={(e) => {
                e.preventDefault();
                logout();
                console.log("logout");
              }}
            >
              <i class="fa-solid fa-right-from-bracket"></i>
              <h2>Loug Out</h2>
            </a>
          </li>
        </ul>
      </div>
      <div className="content">
        {activeTab == "home" && <Homedash />}
        {activeTab == "add-ressource" && <FormRessource onFormSubmit={showHomeDash}/>}
        {activeTab == "profile" && <ProfileUser onFormSubmit={showHomeDash} authUser={authUser}/>}
      </div>
    </div>
  );
}

export default Dashboard;
