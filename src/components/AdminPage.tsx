import { useAccount } from "@azure/msal-react";
import { useEffect, useMemo, useState } from "react";
import { getEmail } from "./dbFunctions/checkAdmin";
import { BeatLoader } from "react-spinners";


const AdminPage = ({children}:{children: any}) => {

    const account = localStorage.getItem("account") || "{}";
    const userAccount = useAccount(JSON.parse(account)); 
    const [isAdmin , setisAdmin] = useState(false);
    const [isLoad , setIsLoading] = useState(true);
    console.log("email check")

    useEffect(() => {
        // getEmail(userAccount?.idTokenClaims?.preferred_username as string).then((res)=>{
        //     setisAdmin(res);
        //     setIsLoading(false);
        // });
        console.log("second")

        const fetchData = async () => {
            if (userAccount) {
              const email = await getEmail(userAccount?.idTokenClaims?.preferred_username as string);
              setisAdmin(email);
              setIsLoading(false);
            }
          };
     
        fetchData();
    },[userAccount])


    return <>
        {isLoad && <BeatLoader />}
        {!isLoad && (
            <>
            {isAdmin? children:
                <>Access Denied</> // Make UserManageCheck.tsx and outlet here. 
                // Access denied page must have 
            } 
            </>
        )}
    </>
}

export default AdminPage;