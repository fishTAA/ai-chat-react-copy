import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Login from "../../pages/login/login";
const endPoint = process.env.REACT_APP_API_URL || "http://localhost:8000";
 

// export const userValidationTimeOut = async (token: string) => {
//   try {
//     const response = await fetch(`${endPoint}/validateUser`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//       // additional options if needed
//     });

//     const data = await response.json();
//     console.log("Data from backend:", data);
//   } catch (error) {
//     console.error("Error sending token to backend:", error);
//   }
// };

export const useAuth = () => {
    const navigate = useNavigate();
 
    const Authed = ({children}:{children:any}) => {
       
        const sessionToken = localStorage.getItem('token') ?? '';
        console.log(sessionToken);
        if (sessionToken) {
            try {   // Validate session token
                const decoded = jwtDecode(sessionToken);
 
                // Check token expiration (assuming token contains 'exp' claim)
                const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
                if (decoded.exp && decoded.exp < currentTimestamp) {
                    localStorage.removeItem('account'); //Remove the token from localstorage if expired
                    navigate('/'); // Redirect to login page if the token has expired
                    // return <>Access Denied</>
                }
                return <>{children}</>
                // Perform further operations based on the validity of the token
            } catch (error) {
                localStorage.removeItem('account'); // Remove the token from localstorage if not valid
                return <>Access Denied</>
            }
        } else {
            return <>Access Denied</>
        }
    }

    const AuthedComponent = ({children}:{children:any}) => {
       
        const sessionToken = localStorage.getItem('token') ?? '';

        if (sessionToken) {
            try {   // Validate session token
                const decoded = jwtDecode(sessionToken);
 
                // Check token expiration (assuming token contains 'exp' claim)
                const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
                if (decoded.exp && decoded.exp < currentTimestamp) {
                    //localStorage.removeItem('TICKETING-AUTH'); //Remove the token from localstorage if expired
                    //navigate('/'); // Redirect to login page if the token has expired
                    return <></>
                }
                return <>{children}</>
                // Perform further operations based on the validity of the token
            } catch (error) {
                //localStorage.removeItem('TICKETING-AUTH'); // Remove the token from localstorage if not valid
                return <></>
                //navigate('/'); // Redirect to login page if the token is not valid
            }
        } else {
            return <></>
        }
    }
   
  return {Authed, AuthedComponent};
};

export default useAuth;