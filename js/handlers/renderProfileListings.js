import { getTimeLeft } from "./getTimeLeft.js";

export function renderProfileListings(listings) {
  const listingsContainer = document.querySelector(".grid");
  if (!listingsContainer) {
    console.warn("Listings container not found.");
    return;
  }

  if (listings.length === 0) {
    listingsContainer.innerHTML = `<p class="text-ah-blue">No listings found for this profile.</p>`;
    return;
  }

  listingsContainer.innerHTML = listings
    .map((listing) => {
      const image = listing.media?.[0]?.url || "./img/default.png";
      const altText = listing.media?.[0]?.alt || listing.title;
      const timeLeft = getTimeLeft(listing.endsAt);

      // Calculate highest bid
      const highestBid =
        listing._bids && listing._bids.length > 0
          ? Math.max(...listing._bids.map((bid) => bid.amount))
          : 0;
      return `
        <div class="bg-[#FFFDFA] rounded flex flex-col hover:shadow-md transition duration-300">
          <a href="listing.html?id=${listing.id}">
            <img
              src="${image}"
              alt="${altText}"
              class="rounded-t-lg w-full h-48 object-cover"
            />
            <p class="text-lg text-ah-blue font-semibold py-1 p-3 text-center line-clamp-1">
              ${listing.title}
            </p>
            <p class="text-ah-blue text-sm px-3">(${
              listing._count?.bids || 0
            } bids total)</p>
            <p class="text-ah-blue pt-1 px-3 text-sm">Ends in: ${timeLeft}</p>
          </a>
          <a
            href="listing.html?id=${listing.id}"
            class="text-white bg-ah-cta rounded-lg px-5 py-3 m-3 text-center hover:bg-ah-ctahover transition duration-150 font-helvetica text-lg"
          >
            Manage Auction
          </a>
        </div>
      `;
    })
    .join("");
}
