// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { searchHotels } from '@/Redux/store/hotelSlice';
// import { FaMapMarkerAlt } from 'react-icons/fa';
// // import { useNavigate } from 'react-router-dom';
// import { useRouter } from "next/navigation";
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // const isMobile = window.innerWidth < 640;

// const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3, // default for desktop
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     responsive: [
//         {
//             breakpoint: 1024, // tablet
//             settings: {
//                 slidesToShow: 2,
//             },
//         },
//         {
//             breakpoint: 784, // mobile
//             settings: {
//                 slidesToShow: 1,
//             },
//         },
//     ],
// };

// const HotelRecentSearch = () => {
//     const dispatch = useDispatch();
//     // const navigate = useNavigate();
//     const router = useRouter();
//     const { searchResults } = useSelector((state) => state.hotel);
//     const [hotels, setHotels] = useState([])
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 640);
//         };

//         handleResize(); // initial check

//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);
//     const getCookie = (name) => {
//         const cookie = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
//         return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
//     };
//     const shouldUseSlider = isMobile
//         ? hotels?.length >= 2   // mobile
//         : hotels?.length >= 3;  // tablet + laptop
//     useEffect(() => {
//         // hotelState
//         const savedData = getCookie('hotelState');
//         if (savedData) {
//             try {
//                 const parsedData = JSON.parse(savedData);
//                 dispatch(searchHotels({
//                     location: parsedData.location,
//                     checkIn: parsedData.startDate,
//                     checkOut: parsedData.endDate,
//                     requiredRoomCount: parsedData.rooms,
//                     page: 0,
//                     size: 10,
//                 }));
//             } catch (error) {
//                 console.error('Error parsing cookie JSON:', error);
//             }
//         } else {
//             console.log('No carPackageState cookie found');
//         }
//     }, [dispatch])

//     useEffect(() => {
//         // console.log(searchResults.content)
//         setHotels(searchResults.content)
//     }, [searchResults])

//     const handleBookNow = async (startingPrice, hotel) => {
//         const savedData = getCookie('hotelState');
//         const parsedData = JSON.parse(savedData);
//         console.log(parsedData)
//         const data = new URLSearchParams({
//             room: parsedData.rooms,
//             location: parsedData.location,
//             checkIn: parsedData.startDate,
//             checkOut: parsedData.endDate,
//             id: hotel.id,
//             total: parsedData.total,
//             startingPrice: startingPrice
//         }).toString();
//         router.push(`/details?${data}`)
//     }


//     return (
//         <div className="w-full mt-6">
//             {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//             Continue searching for Hotels
//           </h2> */}
//             {shouldUseSlider ? (
//                 // {hotels?.length >= (isMobile ? 2 : 3) ? (
//                 // {hotels?.length >= 3 ? (
//                 // ✅ Show Carousel if there are 3 or more hotels
//                 <Slider {...settings}>
//                     {hotels.map((hotel, index) => (
//                         <motion.div
//                             key={hotel.id || index}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: index * 0.2 }}
//                             className="p-3"
//                         >
//                             <div className="rounded-3xl bg-white overflow-hidden border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col h-[430px]">
//                                 {/* Image */}
//                                 <div className="h-52 w-full overflow-hidden">
//                                     <img
//                                         src={hotel.photoUrls?.[0]}
//                                         alt={hotel.name}
//                                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                                     />
//                                 </div>

//                                 {/* Content */}
//                                 <div className="p-6 flex flex-col h-full">
//                                     <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 min-h-[28px]">
//                                         {hotel.name}
//                                     </h2>

//                                     <div className="flex items-center gap-2 mb-3 text-gray-700 min-h-[24px]">
//                                         <FaMapMarkerAlt className="text-red-500 text-lg" />
//                                         <span className="text-sm">
//                                             {hotel.area}, {hotel.city}
//                                         </span>
//                                     </div>

//                                     <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
//                                         {hotel.description || ""}
//                                     </p>

//                                     {hotel.tags?.length > 0 && (
//                                         <div className="flex items-center gap-2 mb-4 min-h-[24px]">
//                                             <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                                                 {hotel.tags[0]}
//                                             </span>
//                                         </div>
//                                     )}

//                                     <div className="flex items-center justify-between mt-auto">
//                                         <span className="text-lg font-bold text-gray-900">
//                                             ₹{hotel.startingPrice.toLocaleString("en-IN")}
//                                             <span className="text-sm font-normal text-gray-600 ml-1">
//                                                 /night
//                                             </span>
//                                         </span>
//                                         <button
//                                             onClick={() =>
//                                                 handleBookNow(
//                                                     hotel.startingPrice,
//                                                     hotel
//                                                 )
//                                             }
//                                             className="cursor-pointer px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
//                                         >
//                                             View Details →
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </Slider>
//             ) : (
//                 // ✅ Static layout if 1 or 2 hotels
//                 <div
//                     className={`grid gap-1 justify-items-center ${hotels?.length === 1 ? "grid-cols-1" : "md:grid-cols-2 grid-cols-1"
//                         }`}
//                 >
//                     {hotels?.map((hotel, index) => (
//                         <motion.div
//                             key={hotel.id || index}
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6, delay: index * 0.2 }}
//                             className="w-full max-w-[400px]"
//                         >
//                             <div className="rounded-3xl bg-white overflow-hidden border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col h-[430px]">
//                                 <div className="h-52 w-full overflow-hidden">
//                                     <img
//                                         src={hotel.photoUrls?.[0]}
//                                         alt={hotel.name}
//                                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                                     />
//                                 </div>

//                                 <div className="p-6 flex flex-col h-full">
//                                     <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 min-h-[28px]">
//                                         {hotel.name}
//                                     </h2>

//                                     <div className="flex items-center gap-2 mb-3 text-gray-700 min-h-[24px]">
//                                         <FaMapMarkerAlt className="text-red-500 text-lg" />
//                                         <span className="text-sm">
//                                             {hotel.area}, {hotel.city}
//                                         </span>
//                                     </div>

//                                     <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
//                                         {hotel.description || ""}
//                                     </p>

//                                     {hotel.tags?.length > 0 && (
//                                         <div className="flex items-center gap-2 mb-4 min-h-[24px]">
//                                             <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                                                 {hotel.tags[0]}
//                                             </span>
//                                         </div>
//                                     )}

//                                     <div className="flex items-center justify-between mt-auto">
//                                         <span className="text-lg font-bold text-gray-900">
//                                             ₹{hotel.startingPrice.toLocaleString("en-IN")}
//                                             <span className="text-sm font-normal text-gray-600 ml-1">
//                                                 /night
//                                             </span>
//                                         </span>
//                                         <button
//                                             onClick={() =>
//                                                 handleBookNow(
//                                                     hotel.startingPrice.toLocaleString("en-IN"),
//                                                     hotel
//                                                 )
//                                             }
//                                             className="cursor-pointer px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
//                                         >
//                                             View Details →
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             )}
//         </div>

//     )
// }

// export default HotelRecentSearch
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { searchHotels } from '@/Redux/store/hotelSlice';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotelRecentSearch = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { searchResults } = useSelector((state) => state.hotel);
    const [hotels, setHotels] = useState([]);
    
    // 1. Add state for screen width to avoid "window is not defined"
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Handle window check only on client side
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        
        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3, // Shows 1 card on mobile, 3 on desktop
        slidesToScroll: 1,
        // arrows: !isMobile,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    const getCookie = (name) => {
        if (typeof document === 'undefined') return null; // SSR safety
        const cookie = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
    };

    useEffect(() => {
        const savedData = getCookie('hotelState');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                dispatch(searchHotels({
                    location: parsedData.location,
                    checkIn: parsedData.startDate,
                    checkOut: parsedData.endDate,
                    requiredRoomCount: parsedData.rooms,
                    page: 0,
                    size: 10,
                }));
            } catch (error) {
                console.error('Error parsing cookie:', error);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        setHotels(searchResults?.content || []);
    }, [searchResults]);

    const handleBookNow = (startingPrice, hotel) => {
        const savedData = getCookie('hotelState');
        const parsedData = JSON.parse(savedData);
        const data = new URLSearchParams({
            room: parsedData.rooms,
            location: parsedData.location,
            checkIn: parsedData.startDate,
            checkOut: parsedData.endDate,
            id: hotel.id,
            total: parsedData.total,
            startingPrice: startingPrice
        }).toString();
        router.push(`/details?${data}`);
    };

    // LOGIC: 
    // Desktop/Tablet: Slider if length >= 3
    // Mobile: Slider if length >= 2
    const shouldShowSlider = isMobile ? hotels.length >= 2 : hotels.length >= 3;

    return (
        <div className="w-full mt-6 px-4">
            {shouldShowSlider ? (
                <Slider {...settings}>
                    {hotels.map((hotel, index) => (
                        <HotelCard key={hotel.id || index} hotel={hotel} handleBookNow={handleBookNow} index={index} />
                    ))}
                </Slider>
            ) : (
                <div className={`grid gap-4 justify-items-center ${hotels.length === 1 ? "grid-cols-1" : "md:grid-cols-2 grid-cols-1"}`}>
                    {hotels.map((hotel, index) => (
                        <div key={hotel.id || index} className="w-full max-w-[400px]">
                             <HotelCard hotel={hotel} handleBookNow={handleBookNow} index={index} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Extracted Card Component for cleaner code
const HotelCard = ({ hotel, handleBookNow, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="p-2"
    >
        <div className="rounded-3xl bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition-all flex flex-col h-[450px]">
            <div className="h-48 w-full overflow-hidden">
                <img src={hotel.photoUrls?.[0]} alt={hotel.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{hotel.name}</h2>
                <div className="flex items-center gap-1 text-gray-600 my-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="text-xs">{hotel.area}, {hotel.city}</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{hotel.description}</p>
                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold">₹{hotel.startingPrice.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-gray-500"> /night</span>
                    </div>
                    <button 
                        onClick={() => handleBookNow(hotel.startingPrice, hotel)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

export default HotelRecentSearch;