export async function deleteListing(id) {
  const token = localStorage.getItem("LoginToken");
  const endpoint = `https://v2.api.noroff.dev/auction/listings/${id}`;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || "Failed to delete listing."
      );
    }

    return { success: true, message: "Listing deleted successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
