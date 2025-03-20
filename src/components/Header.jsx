import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
 import { SignedIn, SignedOut, SignInButton,SignUpButton, UserButton } from "@clerk/clerk-react";


const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  const toggleSideMenu = () => {
    if (isSidebarOpen) {
      setIsClosing(true);
  
      // Step 2: Delay sidebar close (300ms matches animation duration)
      setTimeout(() => {
        setIsSidebarOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsSidebarOpen(true);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden bg-yellow-600 md:flex justify-between py-2">
        <div className="logo text-white text-center flex justify-center items-center px-8 text-2xl font-bold">
          TLE-Tracker        </div>
        <div className="navbar flex text-white text-md justify-center items-center px-12 py-2 gap-4">
              <nav>
        <ul className="flex gap-2">
          <li>
           <Link to="/" className="hover:underline text-center">Home</Link>
          </li>
           <li>
          <SignedOut>
        <SignInButton />
       </SignedOut>
           </li>
          <li>
           <SignedOut>
        <SignUpButton />
       </SignedOut>
           </li>
        
       
             <li>
             <SignedIn>
               <Link to="/bookmarks" className="hover:underline">Bookmarks</Link>
               </SignedIn>
             </li>
             <li className="ml-2">
             <SignedIn>
               <UserButton />
               </SignedIn>
             </li>
       
      
        
         </ul>
      </nav>
       
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-yellow-600 text-white flex justify-between py-2 px-4">
        <div className="logo text-white text-lg">  TLE-Tracker  </div>
        <motion.div
          className="cursor-pointer"
        
          animate={{ rotate: isSidebarOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
            <div className="flex justify-center items-center  gap-6">
           
            <Bars3Icon className="w-6 h-6 text-white"   onClick={toggleSideMenu}  />
            </div>
            
        </motion.div>
      </div>

      {/* Sidebar Menu with Animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSideMenu}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 w-[60%] h-full bg-blue-950 z-30 shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            <motion.div 
  className="flex justify-between items-center text-white p-4 cursor-pointer"
  onClick={toggleSideMenu}
>
  <div className="w-full"></div> {/* This pushes the close button to the right */}
  <motion.div
   animate={{ rotate: isClosing ? 50 : 0 }}
   transition={{ duration: 0.3 }} 
  >
    <XMarkIcon className="w-6 h-6 text-white" />
    </motion.div>
</motion.div>


              <ul className="flex flex-col text-white text-md gap-2 p-4">
              
      
          <li>
           <Link to="/" className="hover:underline text-center">Home</Link>
          </li>
           <li>
          <SignedOut>
        <SignInButton />
       </SignedOut>
           </li>
          <li>
           <SignedOut>
        <SignUpButton />
       </SignedOut>
           </li>
        
       
             <li>
             <SignedIn>
               <Link to="/bookmarks" className="hover:underline">Bookmarks</Link>
               </SignedIn>
             </li>
             <li className=" mt-4 md:ml-2">
             <SignedIn>
               <UserButton /> 
               </SignedIn>
             </li>
       
      
        
         
    
                
              
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

