import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import ContestCard from "../components/ContestCard";
import { ClipLoader } from "react-spinners"; // Importing the loader

const BookMarks = () => {
    const {user} = useUser();
   const [userId] = useState(user?.id)
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Number of bookmarks per page
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchBookmarks = async (page, limit) => {
    try {
      setLoading(true);
      const url = `${backendUrl}/api/bookmarks/${userId}?page=${page}&limit=${limit}`;
      const response = await axios.get(url);
    
      
      setBookmarks(response.data.bookmarks);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
        console.log(error ,"err")
      console.error("Error fetching bookmarks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks(page, limit);
  }, [page, limit , refreshKey]);

  

  return (
    <div className="p-4 min-h-[calc(100vh-90px)] relative">
      <h2 className="text-lg font-bold mb-4">Bookmarks</h2>
      
      {loading ? (
        <div className="min-h-[calc(100vh-90px)] flex justify-center items-center">
        <ClipLoader  color="#ca8a04" size={50} /> 
          </div>
       
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.length === 0 ? (
          
            <div className="col-span-3 text-center text-gray-500 font-medium text-lg">
              No bookmarks yet
            </div>
          
        ) :(
          bookmarks.map((bookmark) => (
            <ContestCard
              setRefreshKey={setRefreshKey}
              refreshKey={refreshKey}
              activeTab={"upcoming"}
              solutionLink={bookmark.solutionLink}
              isBookmarked={bookmark?.isBookmarked}
              contestId={bookmark.contestId._id}
              key={bookmark._id}
              title={bookmark?.contestId?.name}
              platform={bookmark?.contestId?.platform}
              contestName={bookmark.contestId.name}
              startSec={bookmark?.contestId?.startTimeSeconds}
              duration={bookmark?.contestId?.durationSeconds}
            />
          ))
        )}
      </ul>
      
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center absolute bottom-0">
        {page > 1 && (
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-yellow-600 text-white rounded-lg mx-2">
            Previous
          </button>
        )}
      {
  totalPages === 0 ? ""  : (
    <span>Page {page} of {totalPages}</span>
  )
 }
        {page < totalPages && (
          <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} className="px-4 py-2 bg-yellow-600 text-white rounded-lg mx-2">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BookMarks;


