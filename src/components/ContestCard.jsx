import Leetcode from '../../public/leetcode.png'
import Codeforces from '../../public/codeforces.webp'
import Codechef from '../../public/codechef.png'
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid"; 
import { useState } from 'react';
import Countdown from './Countdown';
import { useUser } from "@clerk/clerk-react";
import { toast } from 'react-toastify';


const ContestCard = ({ platform,solutionLink,activeTab,setRefreshKey ,refreshKey,isBookmarked,contestId, contestName, duration, startSec }) => {
 
  

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
  const {user} = useUser();
  const [userId] = useState(user?.id)
  const [bookmark ,setBookmark] = useState(false);
  // Select the correct platform logo
  const platformLogo =
    platform === "LeetCode" ? Leetcode :
    platform === "Codeforces" ? Codeforces :
    Codechef;

    const handleBookmark = async () => {
      if (!user) {
        alert("Please log in to bookmark this contest.");
        return;
      }
    
      try {
        const response = await fetch(`${backendUrl}/api/bookmarks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id, // Get user ID from Clerk
            contestId,
          }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to toggle bookmark");
        }
    
        const data = await response.json();
       // Toggle bookmark state based on response
        setBookmark(data.isBookmarked);
        setRefreshKey((prev) => prev + 1);
    
        toast.success(data.isBookmarked ? "Contest bookmarked successfully!" : "Bookmark removed!");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to toggle bookmark.");
      }
    };
    

  return (
    <div className="p-4 bg-white dark:bg-gray-800 space-y-4 rounded-lg shadow-md border border-gray-800 hover:shadow-lg transition-shadow duration-300">
      {/* Platform & Name */}
      <div className="flex justify-between items-center gap-3">
        <div className='flex justify-start items-center gap-3'>
        <img className={`${platform === "Codeforces" ? "w-6" : "w-20"} h-12 object-contain`} src={platformLogo} alt={platform} />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
          {contestName}
        </h2>
        </div>
       
       {
        activeTab === "upcoming" && (
          <BookmarkSolid onClick={handleBookmark} className={`cursor-pointer size-5 ${bookmark || isBookmarked ? "text-yellow-600" : "text-gray-300"}`}/>
        )
       }
      </div>

      {/* Contest Details */}
      <div className='flex justify-between items-center'>
      <div className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
        <p>
          <strong className="text-gray-800 dark:text-white">Date:</strong> 
          <span className="ml-1">{new Date(startSec * 1000).toLocaleDateString()}</span>
        </p>
        <p>
          <strong className="text-gray-800 dark:text-white">Time:</strong> 
          <span className="ml-1">{new Date(startSec * 1000).toLocaleTimeString()}</span>
        </p>
        <p>
          <strong className="text-gray-800 dark:text-white">Duration:</strong> 
          <span className="ml-1">{(duration / 3600).toFixed(1)} hrs</span>
        </p>
      </div>
      <div className='space-y-2'>
        {
          activeTab === "upcoming" && (
            <>
            <h2 className='text-gray-800 text-center text-md'> Ends In</h2>
            <Countdown targetDate={startSec}/>
            </>
          )
        }
   {solutionLink && (
  <div className="flex flex-col items-center gap-2 p-4 bg-white">
    <a
      href={solutionLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M19.615 6.153c-.228-.86-.897-1.53-1.757-1.757C16.136 4 12 4 12 4s-4.136 0-5.858.396c-.86.227-1.53.897-1.757 1.757C4 7.876 4 12 4 12s0 4.124.385 5.847c.227.86.897 1.53 1.757 1.757C7.864 20 12 20 12 20s4.136 0 5.858-.396c.86-.227 1.53-.897 1.757-1.757C20 16.124 20 12 20 12s0-4.124-.385-5.847zM10.4 15.2V8.8l5.6 3.2-5.6 3.2z"
          clipRule="evenodd"
        />
      </svg>
      View Solutions
    </a>
  </div>
)}


     
      </div>
      
      </div>
    
    </div>
  );
};

export default ContestCard;
