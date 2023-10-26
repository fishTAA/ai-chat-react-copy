import React from 'react';
import { Button, Box, Hero, Heading } from 'react-bulma-components';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { loginRequest,pca } from '../../authconfig';
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";

function Login() {
  const { instance, accounts } = useMsal();

if (accounts.length > 0) {
    pca.setActiveAccount(accounts[0]);
}

pca.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        pca.setActiveAccount(account);
    }
});

  const handleLogin = async () => {
    try {
      if (accounts.length === 0) {
        // No authenticated accounts, initiate login
        await instance.loginRedirect(loginRequest);
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
    instance.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:3000',
  })
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