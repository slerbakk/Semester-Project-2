export async function fetchProfileListings(profileName) {
  const url = `https://v2.api.noroff.dev/auction/profiles/${profileName}/listings?_bids=true&_seller=true`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching profile listings:", errorData);
      return [];
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile listings:", error);
    return [];
  }
}
