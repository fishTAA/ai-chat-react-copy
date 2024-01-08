import React, {useEffect, useState} from 'react';
import { Navbar,Button } from "react-bulma-components";
import { getEmail } from './checkAdmin';
import { useAccount } from '@azure/msal-react';




  const CheckAdmin = () => {
  
  const account = localStorage.getItem("account") || "{}";
  const userAccount = useAccount(JSON.parse(account)); 
    const [getAdmin, setGetAdmin] = useState<boolean>();
    useEffect( ()=>{
      const fetchData = async () => {
        if (userAccount) {
          const email = await getEmail(userAccount?.idTokenClaims?.preferred_username as string);
          setGetAdmin(email);
        }
      };
  
      fetchData();
      },[userAccount])
      console.log("email is",userAccount?.idTokenClaims?.preferred_username)
    console.log("funtion", getAdmin)

    if(getAdmin){
      return (
       <Navbar.Item 
            style={{borderRadius: "6px"}}
            href="/manage">
            Manage
          </Navbar.Item>
      );
    }else{
      return (
        <></>
      );
    }
      }

export default CheckAdmin;

