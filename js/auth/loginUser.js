import { baseUrl, loginUrl } from "../constants/api.js";

export async function loginUser(user) {
  const url = `${baseUrl}${loginUrl}`;
  // The options for the POST request.
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
    },
    body: JSON.stringify(user),
  };

  try {
    // Send the login request
    const response = await fetch(url, options);
    const data = await response.json();

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Login failed");
    }

    // Extract the token and user data from the response
    const token = data.data?.accessToken;
    const user = {
      name: data.data?.name,
      email: data.data?.email,
      bio: data.data?.bio || "No bio available",
      avatar: data.data?.avatar,
      banner: data.data?.banner,
    };

    // Check if we have both token and user data
    if (token && user) {
      // Save token and user data in localStorage
      localStorage.setItem("LoginToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    return data;
  } catch (error) {
    throw error;
  }
}
