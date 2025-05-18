import { getTimeLeft } from "./getTimeLeft.js";

export function renderProfileBids(bids) {
  const bidsContainer = document.querySelector("#profile-bids");
  if (!bidsContainer) return;

  if (!bids || !bids.length) {
    bidsContainer.innerHTML = `<p class="text-ah-blue">No bids placed yet.</p>`;
    return;
  }

  bidsContainer.innerHTML = bids
    .map((bid) => {
      const listing = bid.listing;
      if (!listing) return "";

      const image = listing?.media?.[0]?.url || "./img/default.png";
      const timeLeft = getTimeLeft(listing?.endsAt);

      return `
        <div class="bg-[#FFFDFA] rounded flex flex-col hover:shadow-md transition duration-300">
          <a href="listing.html?id=${listing.id}">
            <img
              src="${image}"
              alt="${listing.title}"
              class="rounded-t-lg w-full h-48 object-cover"
            />
            <div class="p-4">
              <p class="text-lg text-ah-blue font-semibold line-clamp-1">${
                listing.title
              }</p>
              <p class="text-ah-blue">Your Bid: ${bid.amount} credits</p>
              <p class="text-ah-blue text-sm">Bid placed: ${new Date(
                bid.created
              ).toLocaleDateString()}</p>
              <p class="text-ah-blue text-sm">Ends in: ${timeLeft}</p>
            </div>
          </a>
        </div>
      `;
    })
    .filter(Boolean)
    .join("");
}
