import React from "react";

const Footer = () => {
  return (
    <footer className="bg-yellow-600 text-white text-center p-4">
      &copy; {new Date().getFullYear()} TLE Tracker. All rights reserved.
    </footer>
  );
};

export default Footer;
