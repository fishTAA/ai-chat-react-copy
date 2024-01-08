import { useAccount } from "@azure/msal-react";
import { useEffect, useMemo, useState } from "react";
import { getEmail } from "./dbFunctions/checkAdmin";


const AdminComponent = ({children}:{children: any}) => {

    const account = localStorage.getItem("account") || "{}";
    const userAccount = useAccount(JSON.parse(account)); 
    const [isAdmin , setisAdmin] = useState(false);
    
    useEffect(() => {
        // getEmail(userAccount?.idTokenClaims?.preferred_username as string).then((res)=>setisAdmin(res));
        console.log("first", isAdmin)
        const fetchData = async () => {
            if (userAccount) {
              const email = await getEmail(userAccount?.idTokenClaims?.preferred_username as string);
              setisAdmin(email);
            }
          };
    
        fetchData();
    },[userAccount])

    return <>
        {isAdmin && children}
    </>
}

export default AdminComponent;