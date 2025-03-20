import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiSelectDropdown from "../components/Multiselectdropdown.jsx";
import ContestCard from "../components/ContestCard.jsx";
import {Button} from "@heroui/button";
import { useUser } from "@clerk/clerk-react";
import { ClipLoader } from "react-spinners";


const backendUrl = import.meta.env.VITE_BACKEND_URL || "";


const Homepage = () => {
  const {user} = useUser();
  const [userId] = useState(user?.id);
  const [refreshKey, setRefreshKey] = useState(0);
  const [contests, setContests] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("upcoming"); // Default to upcoming contests
  const limit = 6; // Number of contests per page

  const fetchContests = async (type, platforms, page, limit) => {

    try {
      const platformQuery = platforms.length > 0 ? `&platform=${platforms.join(",")}` : "";
      const url = `${backendUrl}/api/contests/${type}?userId=${userId}${platformQuery}&page=${page}&limit=${limit}`;
      
      const response = await axios.get(url);
     
      return response.data;
    } catch (error) {
      console.error("Error fetching contests:", error);
      throw new Error("Failed to fetch contests.");
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchContests(activeTab, selectedPlatforms, page, limit);
       
        setContests(data.contests);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError("Failed to fetch contests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, selectedPlatforms, page]);

  return (
    <div className="p-4 w-full relative space-y-2 min-h-[calc(100vh-40px)] bg-white dark:bg-black max-w-screen overflow-x-hidden">
      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <Button
        variant="bordered"
          className={`px-4 py-2 rounded-full mx-2 ${activeTab === "upcoming" ? "bg-yellow-600 text-white" : "bg-gray-200"}`}
          onClick={() => {
            setActiveTab("upcoming");
            setPage(1);
          }}
        >
          Upcoming Contests
        </Button>
        <Button
        variant="faded"
          className={`px-4 py-2 rounded-full mx-2 ${activeTab === "previous" ? "bg-yellow-600 text-white" : "bg-gray-200"}`}
          onClick={() => {
            setActiveTab("previous");
            setPage(1);
          }}
        >
          Previous Contests
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row mb-4 justify-between items-center">
        <h1 className="text-xl font-bold">{activeTab === "upcoming" ? "Upcoming Contests" : "Previous Contests"}</h1>
        <MultiSelectDropdown selectedOptions={selectedPlatforms} onChange={setSelectedPlatforms} />
      </div>

      {/* Contests List */}
      {loading ? (
        <div className="min-h-[calc(100vh-200px)] flex justify-center items-center">
        <ClipLoader  color="#ca8a04" size={50} /> 
          </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {contests.map((contest) => (
            <ContestCard
            refreshKey={refreshKey}
            setRefreshKey={setRefreshKey}
            activeTab={activeTab}
            solutionLink={contest.solutionLink}
            isBookmarked={contest.isBookmarked}
            contestId={contest._id}
              key={contest._id}
              title={contest.title}
              platform={contest.platform}
              contestName={contest.name}
              startSec={contest.startTimeSeconds}
              duration={contest.durationSeconds}
            />
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-start mt-4 md:mt-0 items-center md:absolute bottom-0">
        {page > 1 && (
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-yellow-600 text-white rounded-lg mx-2">
            Previous
          </button>
        )}
      {
  totalPages === 0 ? ""  : (
    <span className="text-center">Page {page} of {totalPages}</span>
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

export default Homepage;
