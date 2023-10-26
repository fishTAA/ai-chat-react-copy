import React from 'react';
import { Button, Box, Hero, Heading } from 'react-bulma-components';
import { MsalProvider, useMsal, useAccount } from '@azure/msal-react';
import { loginRequest,logoutRequest,pca } from '../../authconfig';
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { useNavigate } from 'react-router-dom';
import logo from '../../media/Trajector Main Logo_Color.png';
import background from '../../media/MountainWavesBlue.png';

function Login() {
  const { instance, accounts } = useMsal();

  let navigate = useNavigate();
  const handleLogin = async () => {
    try {
      if (accounts.length === 0) {
        // No authenticated accounts, initiate login
        //await instance.loginRedirect(loginRequest).then((a=> {
        //  console.log(accounts)
        //}));
        await instance.loginPopup().then(async (res) => {
          console.log("login", res)
          localStorage.setItem("account", JSON.stringify(res.account));
          navigate("/");
        });
      } else {
        // User is already authenticated
        console.log('User is already logged in.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const handleLogout = () => {
    instance.logoutRedirect(logoutRequest)
  };




  return (
      <div style={{   
      backgroundImage: `url(${background})`,
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      flexGrow: 1 }}>
        <Hero
          size="fullheight"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            style={{
              height: '300px',
              width: '300px',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0px 0px 5px #2e2c29',
            }}
          >
            <img src={logo} className='trajectorLogo' alt='Trajector Logo' style={{marginBottom: 24}}/>
              <Heading style={{ textAlign: 'center' }}>Login</Heading>
              <Button.Group align="center">
                <Button
                  style={{ backgroundColor: '#0078d4', color: 'white' }}
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