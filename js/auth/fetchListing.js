export async function fetchListing(id) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${id}?_seller=true&_bids=true`
    );
    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error("Error fetching listing:", err);
    return null;
  }
}
