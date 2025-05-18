import { fetchAllAuctions } from "./../auth/fetchAllAuctions.js";

const auctionGrid = document.querySelector(".grid");
const filterSelect = document.querySelector("select");
const paginationContainer = document.querySelector(".pagination");
const searchInput = document.querySelector("input[type='search']");

let currentPage = 1;
const itemsPerPage = 12;

// 🔍 Search only within "myauction" tag
async function searchAuctions(query) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(
        query
      )}&_tag=myauction`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

function createAuctionCard(auction) {
  const { title, description, media, _count, endsAt } = auction;

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
<a href="listing.html?id=${
    auction.id
  }" class="block text-white bg-ah-cta rounded-lg px-5 py-3 text-center hover:bg-ah-ctahover transition duration-150 font-helvetica">
  Place Bid
</a>

      </div>
    </div>
  `;
}

function getTimeLeft(endTime) {
  const end = new Date(endTime);
  const now = new Date();
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return `${days}d ${hours}h`;
}

async function renderFilteredAuctions() {
  const selectedTag = filterSelect.value;
  const auctions = await fetchAllAuctions("myauction"); // Always fetch from 'myauction'

  const filtered =
    selectedTag === "myauction"
      ? auctions
      : auctions.filter((auction) => auction.tags.includes(selectedTag));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAuctions = filtered.slice(startIndex, endIndex);

  auctionGrid.innerHTML = currentAuctions.map(createAuctionCard).join("");
  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let paginationHtml = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `<a href="#" class="px-4 py-2 border border-gray-300 rounded-md text-ah-blue hover:bg-gray-50 page-btn" data-page="${i}">${i}</a>`;
  }

  paginationContainer.innerHTML = paginationHtml;

  const pageButtons = document.querySelectorAll(".page-btn");
  pageButtons.forEach((btn) => {
    btn.classList.remove("bg-ah-cta", "text-white");
    if (parseInt(btn.getAttribute("data-page")) === currentPage) {
      btn.classList.add("bg-ah-cta", "text-white");
    }
  });

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = parseInt(btn.getAttribute("data-page"));
      renderFilteredAuctions();
    });
  });
}

export function renderAuctions() {
  if (!filterSelect || !auctionGrid || !paginationContainer) {
    console.warn("Auction page elements not found.");
    return;
  }

  renderFilteredAuctions();

  // 🔁 Filter dropdown
  filterSelect.addEventListener("change", () => {
    currentPage = 1;
    renderFilteredAuctions();
  });

  // 🔍 Enter key search input
  if (searchInput) {
    searchInput.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const query = event.target.value.trim();

        if (query.length > 2) {
          const results = await searchAuctions(query);
          const filtered = results.filter((auction) =>
            auction.tags.includes("myauction")
          );
          auctionGrid.innerHTML = filtered.map(createAuctionCard).join("");
          paginationContainer.innerHTML = ""; // Hide pagination during search
        } else {
          renderFilteredAuctions(); // fallback if cleared or too short
        }
      }
    });
  }
}
