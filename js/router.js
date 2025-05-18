import { fetchProfileListings } from "./auth/fetchProfileListings.js";
import { renderProfileListings } from "./handlers/renderProfileListings.js";
import { setupEditProfileButton } from "./handlers/editProfileButton.js";
import { updateProfile } from "./auth/updateProfile.js";
import { initializeUserProfile } from "./handlers/getuser.js";
import { renderAuctions } from "./handlers/renderAllListings.js";
import { renderListing } from "./handlers/renderListing.js";
import { createListingHandler } from "./handlers/createListingHandler.js";
import { fetchListing } from "./auth/fetchListing.js";
import { renderFeaturedAuctions } from "./auth/featuredAuctions.js";
import { loginHandler } from "./handlers/loginHandler.js";
import { registerHandler } from "./handlers/registerHandler.js";
import { fetchProfileBids } from "./auth/fetchProfileBids.js";
import { renderProfileBids } from "./handlers/renderProfileBids.js";

export function router() {
  const pathname = window.location.pathname;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("LoginToken");

  // Allow unauthenticated access to public pages
  const publicPages = [
    "/login.html",
    "/register.html",
    "/index.html",
    "/auctions.html",
    "/listing.html",
  ];

  if (!token && !publicPages.includes(pathname)) {
    console.warn("No token found. Redirecting to login...");
    window.location.href = "/login.html";
    return;
  }

  // Route-specific logic
  if (pathname === "/index.html" || pathname === "/") {
    renderFeaturedAuctions(); // Render featured auctions only on the homepage
  } else if (pathname === "/profile.html") {
    initializeUserProfile();

    // Fetch and render profile listings and bids
    const userName = user?.name;
    if (userName) {
      // Fetch listings
      fetchProfileListings(userName).then((listings) => {
        renderProfileListings(listings);
      });

      // Fetch bids
      fetchProfileBids(userName).then((bids) => {
        renderProfileBids(bids);
      });
    }

    // Setup edit profile button
    setupEditProfileButton();
  } else if (pathname === "/auctions.html") {
    renderAuctions();
  } else if (pathname === "/listing.html") {
    renderListing();
  } else if (pathname === "/sell.html") {
    createListingHandler();
  } else if (pathname === "/login.html") {
    loginHandler(); // Handle login page logic
  } else if (pathname === "/register.html") {
    registerHandler(); // Handle register page logic
  } else {
  }
}
