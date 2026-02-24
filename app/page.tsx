// "use client";
// import React, { useEffect, useRef, useState } from "react";
// // import Search from "@/Pag/HomePageComponents/Search";
// import Search from "@/PageComponents/HomePageComponents/Search"
// import Query from "@/PageComponents/HomePageComponents/Query";
// import { fetchPartnerProfile } from "@/Redux/store/partnerSlice";
// import { useDispatch, useSelector } from "react-redux";
// // import { useLocation, useNavigate } from "react-router-dom";
// import {  useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import About from "@/PageComponents/HomePageComponents/About";
// import RecentSearches from "@/PageComponents/HomePageComponents/RecentSearches";

// const HomePage = () => {
//   const location = usePathname();
//   const topRef = useRef(null);
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [pickupFlag, setPickupFlag] = useState(false);
//   const [pickupRoutesDetails, setPickupRoutesDetails] = useState({});

//   const partnerState = useSelector((state) => state.partner);
//   const [status, setStatus] = useState(401);
//   const [rejectionStatus, setRejectionStatus] = useState("");
//   const [selectedTab, setSelectedTab] = useState("");

//   // Runs only when the tab is opened for the first time
//   useEffect(() => {
//     if (!sessionStorage.getItem("tabInitialized")) {
//       // First time tab opened
//       sessionStorage.setItem("tabInitialized", "true");
//       localStorage.setItem("navigation", JSON.stringify(false));
//     }

//     const partner = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const res = await dispatch(fetchPartnerProfile({ token }));
//         setRejectionStatus(res?.payload?.data?.status);
//         if (res?.payload?.status) {
//           setStatus(res?.payload?.status);
//         }
//       }
//     };

//     window.addEventListener("tokenUpdated", partner);
//     partner();

//     return () => window.removeEventListener("tokenUpdated", partner);
//   }, [dispatch]);

//   //Autoscroll to about and contact us
//   useEffect(() => {
//     if (location.state?.scrollTo) {
//       const sectionId = location.state.scrollTo;
      
//       // Small timeout to ensure the DOM is fully rendered
//       setTimeout(() => {
//         const element = document.getElementById(sectionId);
//         if (element) {
//           const navbarHeight = 80;
//           const elementTop = element.getBoundingClientRect().top + window.scrollY;
//           window.scrollTo({
//             top: elementTop - navbarHeight,
//             behavior: "smooth",
//           });
//         }
//       }, 100);

//       // Clear state so it doesn't scroll again on refresh
//       window.history.replaceState({}, document.title);
//     }
//   }, [location]);

//   // Check conditions and navigate only once
//   useEffect(() => {
//     const hasNavigated = JSON.parse(localStorage.getItem("navigation") || "false");

//     if (!hasNavigated && status === 200 && rejectionStatus === "APPROVED") {
//       router.push("/partnerdashboard");
//       localStorage.setItem("navigation", JSON.stringify(true));
//     } else if (!hasNavigated) {
//       // Scroll to topRef if navigation not done
//       if (topRef.current) {
//         const navbarHeight = 80;
//         const elementTop = topRef.current.getBoundingClientRect().top + window.scrollY;
//         window.scrollTo({
//           top: elementTop - navbarHeight,
//           behavior: "smooth",
//         });
//       }
//     }
//   }, [status, rejectionStatus, router]);

//   return (
//     <>
//       <Search ref={topRef} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setPickFlag={setPickupFlag} setPickupRoutesDetails={setPickupRoutesDetails} />
//       <RecentSearches selectedTab={selectedTab} pickupFlag={pickupFlag} setPickupFlag={setPickupFlag} pickupRoutesDetails={pickupRoutesDetails} />
//       {/* <About />
//       <Query /> */}
//       <div id="about-section">
//         <About />
//       </div>
//       <div id="query-section">
//         <Query />
//       </div>
//     </>
//   );
// };

// export default HomePage;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Search from "@/PageComponents/HomePageComponents/Search";
import Query from "@/PageComponents/HomePageComponents/Query";
import { fetchPartnerProfile } from "@/Redux/store/partnerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation"; // Use useSearchParams
import About from "@/PageComponents/HomePageComponents/About";
import RecentSearches from "@/PageComponents/HomePageComponents/RecentSearches";

const HomePage = () => {
  const topRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook to read URL queries
  const dispatch = useDispatch();
  
  const [pickupFlag, setPickupFlag] = useState(false);
  const [pickupRoutesDetails, setPickupRoutesDetails] = useState({});
  const [status, setStatus] = useState(401);
  const [rejectionStatus, setRejectionStatus] = useState("");
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("tabInitialized")) {
      sessionStorage.setItem("tabInitialized", "true");
      localStorage.setItem("navigation", JSON.stringify(false));
    }

    const partner = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const res = dispatch(fetchPartnerProfile({ token }));
        setRejectionStatus(res?.payload?.data?.status);
        if (res?.payload?.status) {
          setStatus(res?.payload?.status);
        }
      }
    };

    window.addEventListener("tokenUpdated", partner);
    partner();
    return () => window.removeEventListener("tokenUpdated", partner);
  }, [dispatch]);

  // FIX: Autoscroll logic using Search Parameters
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo"); // Read '?scrollTo=...' from URL
    
    if (scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          const navbarHeight = 80;
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementTop - navbarHeight,
            behavior: "smooth",
          });
          
          // Clear the URL parameter without refreshing the page
          router.replace("/", { scroll: false });
        }
      }, 100);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const hasNavigated = JSON.parse(localStorage.getItem("navigation") || "false");

    if (!hasNavigated && status === 200 && rejectionStatus === "APPROVED") {
      router.push("/partnerdashboard");
      localStorage.setItem("navigation", JSON.stringify(true));
    } else if (!hasNavigated) {
      if (topRef.current) {
        const navbarHeight = 80;
        const elementTop = topRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - navbarHeight,
          behavior: "smooth",
        });
      }
    }
  }, [status, rejectionStatus, router]);

  return (
    <>
      <Search ref={topRef} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setPickFlag={setPickupFlag} setPickupRoutesDetails={setPickupRoutesDetails} />
      <RecentSearches selectedTab={selectedTab} pickupFlag={pickupFlag} setPickupFlag={setPickupFlag} pickupRoutesDetails={pickupRoutesDetails} />
      <div id="about-section">
        <About />
      </div>
      <div id="query-section">
        <Query />
      </div>
    </>
  );
};

export default HomePage;