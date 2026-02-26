// import React, { useEffect, useState } from 'react';
// import { useRouter } from "next/navigation";

// // Component for general authentication protection
// export const AuthProtectedRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuthentication = () => {
//       try {
//         // Check if userData cookie exists
//         const cookies = document.cookie.split("; ");
//         const userDataCookie = cookies.find((row) =>
//           row.startsWith("userData=")
//         );

//         if (userDataCookie) {
//           const value = userDataCookie.split("=")[1];
//           const userData = JSON.parse(decodeURIComponent(value));

//           // Check if user data exists (any authenticated user)
//           if (userData && userData.uid) {
//             setIsAuthenticated(true);
//           } else {
//             setIsAuthenticated(false);
//           }
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuthentication();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     // return <Navigate to="/" replace />;
//     router.push("/");
//     return;
//   }

//   return children;
// };

// // Component for partner-specific authorization
// const ProtectedRoute = ({ children }) => {
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   // const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthorization = () => {
//       try {
//         // Check if userData cookie exists
//         const cookies = document.cookie.split("; ");
//         const userDataCookie = cookies.find((row) =>
//           row.startsWith("userData=")
//         );

//         if (userDataCookie) {
//           const value = userDataCookie.split("=")[1];
//           const userData = JSON.parse(decodeURIComponent(value));

//           // Check if user has partner role
//           if (userData && userData.role === "PARTNER") {
//             setIsAuthorized(true);
//           } else {
//             setIsAuthorized(false);
//           }
//         } else {
//           setIsAuthorized(false);
//         }
//       } catch (error) {
//         console.error("Error checking authorization:", error);
//         setIsAuthorized(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuthorization();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthorized) {
//     router.replace("/");
//     return;
//     // return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute; 
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Component for general authentication protection
export const AuthProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  const makeTrue=()=>{
    setIsAuthenticated(true)
  }
  const makeFalse=()=>{
    setIsAuthenticated(false)
  }

  useEffect(() => {
    try {
      const cookies = document.cookie.split("; ");
      const userDataCookie = cookies.find((row) =>
        row.startsWith("userData=")
      );

      if (userDataCookie) {
        const value = userDataCookie.split("=")[1];
        const userData = JSON.parse(decodeURIComponent(value));

        if (userData?.uid) {
          // setIsAuthenticated(true);
          makeTrue()
        } else {
          // setIsAuthenticated(false);
          makeFalse()
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    }
  }, []);

  // ✅ Redirect MUST be inside useEffect
  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/"); // use replace to avoid back navigation
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return null; // prevent rendering + prevent redirect loop flash
  }

  return children;
};

// Partner-specific authorization
const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const cookies = document.cookie.split("; ");
      const userDataCookie = cookies.find((row) =>
        row.startsWith("userData=")
      );

      if (userDataCookie) {
        const value = userDataCookie.split("=")[1];
        const userData = JSON.parse(decodeURIComponent(value));

        if (userData?.role === "PARTNER") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error checking authorization:", error);
      setIsAuthorized(false);
    }
  }, []);

  // ✅ Proper redirect effect
  useEffect(() => {
    if (isAuthorized === false) {
      router.replace("/");
    }
  }, [isAuthorized, router]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (isAuthorized === false) {
    return null;
  }

  return children;
};

export default ProtectedRoute;