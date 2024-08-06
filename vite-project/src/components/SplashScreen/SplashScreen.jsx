// // src/SplashScreen.js

// import React, { useState, useEffect } from 'react';
// import { FaCcVisa } from 'react-icons/fa';
// import './SplashScreen.css';

// const SplashScreen = ({ onSplashEnd }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onSplashEnd();
//     }, 3000); // Adjust the duration as needed

//     return () => clearTimeout(timer);
//   }, [onSplashEnd]);

//   return (
//     <div className="splash-screen">
//       <div className="logo-container">
//         <FaCcVisa className="logo" />
//       </div>
//     </div>
//   );
// };

// export default SplashScreen;
