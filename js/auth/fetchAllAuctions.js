import { baseUrl, API_KEY } from "../constants/api.js";

export async function fetchAllAuctions(tags = "myauction") {
  const token = localStorage.getItem("LoginToken");

  const params = new URLSearchParams({
    _seller: "true",
    _bids: "true",
  });

  // Ensure the tags parameter is applied correctly
  if (Array.isArray(tags)) {
    const tagString = tags.join(",").toLowerCase();
    params.append("_tag", tagString);
  } else if (typeof tags === "string" && tags !== "All Categories") {
    params.append("_tag", tags.toLowerCase());
  }

  const url = `${baseUrl}auction/listings?${params.toString()}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    return [];
  }
}
