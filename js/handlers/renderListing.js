import { fetchListing } from "../auth/fetchListing.js";
import { deleteListing } from "../auth/deleteListing.js";

async function placeBid(listingId, amount) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${listingId}/bids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
        },
        body: JSON.stringify({ amount: Number(amount) }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Failed to place bid");
    }

    // After successful bid, fetch updated user profile
    const user = JSON.parse(localStorage.getItem("user"));
    const profileResponse = await fetch(
      `https://v2.api.noroff.dev/auction/profiles/${user.name}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
        },
      }
    );

    const profileData = await profileResponse.json();

    // Update user credits in localStorage
    user.credits = profileData.data.credits;
    localStorage.setItem("user", JSON.stringify(user));

    // Update credits display in navbar
    const navCredits = document.querySelector(".nav-credits");
    if (navCredits) {
      navCredits.textContent = `Credits: ${profileData.data.credits}`;
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export function renderListing(listing) {
  const container = document.getElementById("listing-details");
  if (!listing || !container) return;

  const { title, description, media, endsAt, _count, seller, bids, id } =
    listing;
  const image = media?.length ? media[0].url : "./img/default.png";
  const alt = media?.length ? media[0].alt : title;
  const ends = new Date(endsAt).toLocaleString();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserName = loggedInUser?.name;
  const userCredits = loggedInUser?.credits || 0;
  const highestBid = bids?.length
    ? Math.max(...bids.map((bid) => bid.amount))
    : 0;

  container.innerHTML = `
    <div class="bg-white rounded-lg shadow-md p-6">
      <img src="${image}" alt="${alt}" class="w-full h-64 object-cover rounded-md mb-6" />
      <h1 class="text-3xl font-semibold text-ah-blue mb-4 text-center">${title}</h1>
      <p class="text-gray-700 mb-4 text-center">${description}</p>
      <p class="text-sm text-gray-500 mb-2">Ends At: ${ends}</p>
      <p class="text-sm text-gray-500 mb-2">Current Highest Bid: ${highestBid} credits</p>
      <p class="text-sm text-gray-500 mb-2">Your Credits: ${userCredits} credits</p>
      <p class="text-sm text-gray-500 mb-2">Number of Bids: ${
        _count?.bids || 0
      }</p>
      <p class="text-sm text-gray-500 mb-2">Seller: ${
        seller?.name || "Unknown"
      }</p>
      
      ${
        seller?.name !== loggedInUserName
          ? `
        <div class="mt-6 border-t pt-4">
          <h3 class="text-lg font-semibold mb-2">Place Your Bid</h3>
          <div class="flex gap-2">
            <input 
              type="number" 
              id="bid-amount" 
              class="border rounded p-2 flex-grow"
              min="${highestBid + 1}"
              placeholder="Enter bid amount (min: ${highestBid + 1})"
            />
            <button 
              id="place-bid-button"
              class="bg-ah-cta text-white px-4 py-2 rounded hover:bg-ah-ctahover transition duration-150"
            >
              Place Bid
            </button>
          </div>
          <p id="bid-error" class="text-red-500 mt-2 hidden"></p>
        </div>
      `
          : ""
      }

      <div class="mt-6">
        <h3 class="text-lg font-semibold mb-2">Bid History</h3>
        ${
          bids?.length
            ? `
          <ul class="space-y-2">
            ${bids
              .sort((a, b) => b.amount - a.amount)
              .map(
                (bid) => `
                <li class="border p-2 rounded flex justify-between items-center">
                  <span>
                    <span class="font-semibold">${bid.bidder.name}</span>
                    bid <span class="font-semibold">${bid.amount} credits</span>
                  </span>
                  <span class="text-sm text-gray-500">
                    ${new Date(bid.created).toLocaleString()}
                  </span>
                </li>
              `
              )
              .join("")}
          </ul>
        `
            : `<p>No bids yet.</p>`
        }
      </div>

      ${
        seller?.name === loggedInUserName
          ? `
        <button id="delete-button" class="mt-6 bg-red-500 text-white p-2 rounded">
          Delete Listing
        </button>
      `
          : ""
      }
    </div>
  `;

  // Handle bid placement
  const bidButton = document.getElementById("place-bid-button");
  const bidInput = document.getElementById("bid-amount");
  const bidError = document.getElementById("bid-error");

  if (bidButton && bidInput) {
    bidButton.addEventListener("click", async () => {
      const amount = Number(bidInput.value);

      if (!amount || amount <= highestBid) {
        bidError.textContent = `Bid must be higher than ${highestBid} credits`;
        bidError.classList.remove("hidden");
        return;
      }

      if (amount > userCredits) {
        bidError.textContent = `You don't have enough credits (${userCredits} available)`;
        bidError.classList.remove("hidden");
        return;
      }

      bidButton.disabled = true;
      bidButton.textContent = "Placing bid...";

      const result = await placeBid(id, amount);

      if (result.success) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        bidError.textContent = result.message;
        bidError.classList.remove("hidden");
        bidButton.disabled = false;
        bidButton.textContent = "Place Bid";
      }
    });
  }

  // Handle listing deletion
  const deleteButton = document.getElementById("delete-button");
  if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this listing?")) {
        try {
          const result = await deleteListing(id);
          if (result.success) {
            window.location.href = "/";
          } else {
            alert(result.message);
          }
        } catch (error) {
          alert("Error deleting listing.");
        }
      }
    });
  }
}

// Initialize listing page
if (window.location.pathname === "/listing.html") {
  const listingId = new URLSearchParams(window.location.search).get("id");
  const container = document.getElementById("listing-details");

  (async () => {
    try {
      const listing = await fetchListing(listingId);
      if (listing && Object.keys(listing).length) {
        renderListing(listing);
      } else {
        container.innerHTML = "<p>Error loading listing.</p>";
      }
    } catch (error) {
      container.innerHTML = "<p>Error loading listing.</p>";
    }
  })();
}
