import React from 'react';
import { Button, Box, Hero, Heading } from 'react-bulma-components';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { loginRequest,pca } from '../../authconfig';

function Login() {
  const { instance, accounts } = useMsal();

  const handleLogin = async () => {
    try {
      if (accounts.length === 0) {
        // No authenticated accounts, initiate login
        await instance.loginPopup(loginRequest);
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
    instance.logout();
  };

  return (
      <div style={{ background: 'linear-gradient(220deg, #307FE2 0%, #EF3340 100%)', flexGrow: 1 }}>
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
              <Heading style={{ textAlign: 'center' }}>Login</Heading>
              <Button.Group align="center">
                <Button
                  style={{ backgroundColor: '#0078d4', color: 'white' }}
                  onClick={handleLogin}
                >
                  Microsoft Azure
                </Button>

                <Button
                  style={{ backgroundColor: '#0078d4', color: 'white' }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Button.Group>
          </Box>
        </Hero>
      </div>
  );
}

export default Login;