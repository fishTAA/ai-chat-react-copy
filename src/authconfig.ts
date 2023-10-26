import { Configuration, PopupRequest, PublicClientApplication } from '@azure/msal-browser';

export const configuration: Configuration = {
    auth: {
      clientId: "dbd4e6df-ae87-427d-a5a1-2dc06f241a24",
      authority: "https://login.microsoftonline.com/studentfeutech.onmicrosoft.com",
      redirectUri:'/app',
      postLogoutRedirectUri: "/"
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true
   },

    system: {
        loggerOptions: {
           loggerCallback: (level: any, message: any, containsPii: any) => {
              if (containsPii) {
                 return;
              }
              console.log(`MSAL [${level}]: ${message}`);
           },
        },
     },
    
  };

export const loginRequest: PopupRequest = {
   scopes: ["User.Read"],
   
 };

 export const pca = new PublicClientApplication(configuration);