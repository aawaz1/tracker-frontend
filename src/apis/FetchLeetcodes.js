import React, { useState, useEffect } from "react";
import axios from "axios";

const fetchLeetCodeContests = async () => {
  const query = {
    query: `
      {
        allContests {
          title
          titleSlug
          startTime
          duration
          originStartTime
          isVirtual
        }
      }
    `,
  };

  try {
    const response = await axios.post("https://leetcode.com/graphql", query, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const contests = response.data.data.allContests;
    console.log(contests, "contests")
    return contests;
  } catch (error) {
    console.log(error, "errors")
    console.error("Error fetching LeetCode contests:", error);
    return [];
  }
};

export default fetchLeetCodeContests