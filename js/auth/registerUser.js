import { baseUrl, registerUrl } from "../constants/api.js";

export async function registerUser(user) {
  const url = `${baseUrl}${registerUrl}`;
  // The options for the POST request.
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
    },
    body: JSON.stringify(user),
  };
  // Send the register request
  const response = await fetch(url, options);
  const data = await response.json();

  // Check if the response is successful
  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Registration failed");
  }

  // If the registration is successful, return the response data.
  return data;
}
