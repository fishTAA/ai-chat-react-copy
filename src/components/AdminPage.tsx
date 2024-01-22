import { useAccount } from "@azure/msal-react";
import { useEffect, useMemo, useState } from "react";
import { getEmail } from "./dbFunctions/checkAdmin";
import { BeatLoader } from "react-spinners";
import { redirect } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import accessdenied from '../media/6605568.jpg'

const AdminPage = ({ children }: { children: any }) => {
    const account = localStorage.getItem("account") || "{}";
    const userAccount = useAccount(JSON.parse(account));
    const [isAdmin, setisAdmin] = useState(false);
    const [isLoad, setIsLoading] = useState(true);
    const navigate = useNavigate()

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
    }, [userAccount])


    return <>
        {isLoad && <BeatLoader />}
        {!isLoad && (
            <>
                {isAdmin ? children :
                    <img src={accessdenied} alt="access denied" style={{ zIndex: 200 }} />

                }
            </>
        )}
    </>
}

export default AdminPage;