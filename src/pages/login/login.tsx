import React from "react";
import { Button, Box, Hero, Heading } from "react-bulma-components";
import { MsalProvider, useMsal, useAccount } from "@azure/msal-react";
import { loginRequest, logoutRequest, pca } from "../../authconfig";
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from "@azure/msal-browser";
import { useNavigate } from "react-router-dom";
import logo from "../../media/Trajector Main Logo_Color.png";
import background from "../../media/MountainWavesBlue.png";
import { handleSendTokenToBackend } from "../../components/dbFunctions/sendTokentoBE";

function Login() {
  // Get MSAL instance and accounts
  const { instance, accounts } = useMsal();

  // Get navigation function for routing
  let navigate = useNavigate();

  // Function to handle the login process
  const handleLogin = async () => {
    try {
      if (accounts.length === 0) {
        // No authenticated accounts, initiate login
        //await instance.loginRedirect(loginRequest).then((a=> {
        //  console.log(accounts)
        //}));
        await instance.loginPopup().then(async (res) => {
          console.log("login", res);
          const Token = res.accessToken;
    
          
          // Store the authenticated account in local storage
          localStorage.setItem("account", JSON.stringify(res.account));
          // Navigate to the main application page
          handleSendTokenToBackend(Token);
          navigate("/");
        });
      } else {
        // User is already authenticated
        console.log("User is already logged in.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    return false;
  };

  // Function to handle the logout process
  const handleLogout = () => {
    instance.logoutRedirect(logoutRequest);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        flexGrow: 1,
      }}
    >
      <Hero
        size="fullheight"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            height: "300px",
            width: "300px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0px 0px 5px #2e2c29",
          }}
        >
          <img
            src={logo}
            className="trajectorLogo"
            alt="Trajector Logo"
            style={{
              marginBottom: 24,
            }}
          />
          <Heading
            style={{
              textAlign: "center",
            }}
          >
            Login
          </Heading>
          <Button.Group align="center">
            <Button
              style={{
                backgroundColor: "#0078d4",
                color: "white",
              }}
              onClick={handleLogin}
            >
              Microsoft Azure
            </Button>
          </Button.Group>
        </Box>
      </Hero>
    </div>
  );
}

export default Login;
