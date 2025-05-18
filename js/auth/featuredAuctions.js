import { fetchAllAuctions } from "./fetchAllAuctions.js";

function getTimeLeft(endTime) {
  const end = new Date(endTime);
  const now = new Date();
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return `${days}d ${hours}h`;
}

function createFeaturedAuctionCard(auction) {
  const { title, description, media, _count, endsAt, id } = auction;

  const timeLeft = getTimeLeft(endsAt);
  const image = media?.[0]?.url || "./img/default.png";
  const altText = media?.[0]?.alt || title;

  return `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">
      <div class="relative">
        <img src="${image}" alt="${altText}" class="w-full h-48 object-cover" />
        <div class="absolute top-4 right-4 bg-ah-cta text-white px-3 py-1 rounded-full text-sm font-semibold">
          Ends ${timeLeft}
        </div>
      </div>
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-xl font-semibold text-ah-blue mb-2 line-clamp-2">${title}</h3>
        <p class="text-gray-600 mb-4 line-clamp-3 flex-grow">${description}</p>
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-sm text-gray-500">Bids:</p>
            <p class="text-lg text-ah-blue">${_count?.bids || 0}</p>
          </div>
        </div>
        <a href="listing.html?id=${id}" class="block text-white bg-ah-cta rounded-lg px-5 py-3 text-center hover:bg-ah-ctahover transition duration-150 font-helvetica">
          Place Bid
        </a>
      </div>
    </div>
  `;
}

export async function renderFeaturedAuctions() {
  const auctionGrid = document.querySelector(".grid"); // Ensure this matches your HTML structure
  if (!auctionGrid) {
    console.warn("Auction grid element not found.");
    return;
  }

  try {
    const auctions = await fetchAllAuctions(); // Fetch all auctions
    const shuffled = auctions.sort(() => 0.5 - Math.random()); // Shuffle the auctions
    const featured = shuffled.slice(0, 4); // Select the top 4 featured auctions
    auctionGrid.innerHTML = featured.map(createFeaturedAuctionCard).join(""); // Render the auctions
  } catch (error) {
    console.error("Error rendering featured auctions:", error);
    auctionGrid.innerHTML = "<p>Error loading featured auctions.</p>";
  }
}
