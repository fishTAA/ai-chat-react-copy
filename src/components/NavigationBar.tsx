import * as React from "react";
import { Navbar, Button } from "react-bulma-components";
import logo from "../media/Trajector Main Logo_Color.png";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { pca, logoutRequest } from "../authconfig";
import {
  EventType,
  EventMessage,
  AuthenticationResult,
  InteractionStatus,
} from "@azure/msal-browser";
import CheckAdmin from "./dbFunctions/adminInterface";
import AdminComponent from "./AdminComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSendTokenToBackend } from "./dbFunctions/sendTokentoBE";

export const NavigationBar = () => {

  // State for controlling the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [loadingTest, setLoadingTest] = useState(false);
  const navigate = useNavigate();

  // Handler for logging out
  const handleLogout = () => {
    instance.logoutRedirect(logoutRequest);
  };

    // Get authentication details and initialize the Microsoft Authentication Library
    const { inProgress } = useMsal();
    const account = localStorage.getItem("account") || "{}";
    const token = localStorage.getItem("token") || "{}";

  

  useEffect(() => {
    // Check if the authentication process is not in progress and the user is not authenticated
    if (inProgress === InteractionStatus.None && !isAuthenticated) {
      setLoadingTest(true);
      if(token){
      handleSendTokenToBackend(token)
      console.log("token :" +token);
      }
      if (account) {
        // Attempt to acquire a silent token for the user

        const token = instance
          .acquireTokenSilent({
            account: JSON.parse(account),
            scopes: ["openid", "profile"],
          })
          .then((e) => {
            setLoadingTest(false);
          })
          .catch((e) => {
            console.log("here", e);

            // Redirect to the login page on token acquisition failure
            navigate("/login");
          });
      } else {
        // Redirect to the login page if no account data is available
        navigate("/login");
      }
    }
  }, [inProgress, token]);

  return (
    <Navbar
      style={{
        position: menuOpen ? "absolute" : "fixed",
        width: "-webkit-fill-available",
        zIndex: 100,
        boxShadow: "2px 2px 5px #888888",
        backgroundColor: "white",
      }}
    >
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ width: "200px", height: "auto" }}
          />
        </Navbar.Item>
        <Navbar.Burger
          className={`navbar-burger burger ${menuOpen ? "is-active" : ""}`}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          pull="right"
        />
      </Navbar.Brand>
      <Navbar.Menu
        pull="left"
        style={{
          position: menuOpen ? "absolute" : "unset",
        }}
        className={`navbar-menu ${menuOpen ? "is-active" : ""}`}
      >
        <Navbar.Container align="left">
          <Navbar.Item href="/">Home</Navbar.Item>
          
          <AdminComponent>
            <Navbar.Item style={{ borderRadius: "6px" }} href="/manage">
              Manage
            </Navbar.Item>
          </AdminComponent>

          <Navbar.Item>
            <Button
              style={{ 
                backgroundColor: "#307FE2",
                color: "white"
                }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};
