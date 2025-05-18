import { baseUrl, createListUrl } from "../constants/api.js";

export async function createListing(listing) {
  const url = `${baseUrl}${createListUrl}`;
  // The options for the POST request.
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
    },
    body: JSON.stringify(listing),
  };
  // Send the listing request
  const response = await fetch(url, options);
  const data = await response.json();

  // Check if the response is successful
  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Registration failed");
  }

  // If the listing is posted successfully, return the response data.
  return data;
}
