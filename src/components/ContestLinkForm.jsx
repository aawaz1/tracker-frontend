import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@heroui/button";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

const ContestSolutionForm = () => {
  const [pastContests, setPastContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState("");
  const [solutionLink, setSolutionLink] = useState("");
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchPastContests = async () => {
      try {
        const url = `${backendUrl}/api/contests/previous`;

        const response = await axios.get(url);
        const flattenedContests = response.data.contests.flat();
      
        setPastContests(flattenedContests);
      } catch (error) {
        console.error("Error fetching past contests:", error);
      }
    };

    fetchPastContests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedContest || !solutionLink) {
      setMessage("Please select a contest and enter a valid YouTube link.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/contests/previous/${selectedContest}/solution`,
        { solutionLink }
      );

     
      toast.success(response.data.message)
      setSolutionLink("");
    } catch (error) {
      console.error("Error submitting solution link:", error);
      toast.error("Failed to add solution link.");
    }
  };

  return (
    <div className="flex items-start justify-center min-h-[calc(100vh-200px)] p-4">
      <div className="w-96 p-6 bg-white  rounded-lg border shadow-md relative">
        <h1 className="text-xl font-bold mb-4 text-center">
          Attach Solution  to  Contest
        </h1>
    <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Contest */}
          <label className="block text-sm font-medium">Select Contest:</label>
          <div className="relative">
            <button
              type="button"
              className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedContest
                ? pastContests.find((contest) => contest._id === selectedContest)?.name
                : "-- Select a Contest --"}
            </button>

            {dropdownOpen && (
  <ul className="absolute top-full left-0 w-full max-h-80 overflow-y-auto border bg-white dark:bg-gray-800 rounded-lg shadow-md mt-1 z-10">
    {pastContests.map((contest) => (
      <li
        key={contest._id}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        onClick={() => {
          setSelectedContest(contest._id);
          setDropdownOpen(false);
        }}
      >
        {contest.name}
      </li>
    ))}
  </ul>
)}

          </div>

          {/* YouTube Link Input */}
          <label className="block text-sm font-medium">Solution YouTube Link:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter YouTube link"
            value={solutionLink}
            onChange={(e) => setSolutionLink(e.target.value)}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded-lg">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContestSolutionForm;
