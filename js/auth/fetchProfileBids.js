export async function fetchProfileBids(profileName) {
  const url = `https://v2.api.noroff.dev/auction/profiles/${profileName}/bids?_listings=true`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch bids:", response.statusText);
      return [];
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bids:", error);
    return [];
  }
}
