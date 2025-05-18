/**
 * Fetches user profile from the API
 * @param {string} profileName - The name of the profile to fetch
 * @returns {Promise<Object|null>} User profile data or null if not found
 */
export async function getUserProfile(profileName) {
  const url = `https://v2.api.noroff.dev/auction/profiles/${profileName}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
      },
    });

    if (!response.ok) return null;

    const { data } = await response.json();
    // Update user credits in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.credits = data.credits;
      localStorage.setItem("user", JSON.stringify(user));
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Renders user profile data to the page using ID selectors
 * @param {Object} profile - The user profile data
 */
export function renderUserProfile(profile) {
  if (!profile || typeof profile !== "object") return;

  // Update profile banner
  const bannerElement = document.querySelector("#profile-banner img");
  if (bannerElement) {
    bannerElement.src = profile.banner?.url || "./img/default-banner.png";
    bannerElement.alt = profile.banner?.alt || `${profile.name}'s banner`;
  }

  // Update profile avatar
  const avatarElement = document.querySelector("#profile-avatar img");
  if (avatarElement) {
    avatarElement.src = profile.avatar?.url || "./img/default-avatar.png";
    avatarElement.alt = profile.avatar?.alt || `${profile.name}'s avatar`;
  }

  // Update profile name
  const nameElement = document.getElementById("profile-name");
  if (nameElement) {
    nameElement.textContent = profile.name || "Unknown User";
  }

  // Update profile bio
  const bioElement = document.getElementById("profile-bio");
  if (bioElement) {
    bioElement.textContent = profile.bio || "No bio available";
  }

  // Update credits in navbar
  const navCredits = document.querySelector(".nav-credits");
  if (navCredits) {
    navCredits.textContent = `Credits: ${profile.credits || 0}`;
  }
}

/**
 * Initializes the user profile rendering process
 */
export async function initializeUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.name) {
    window.location.href = "./login.html";
    return;
  }

  const profileData = await getUserProfile(user.name);

  if (profileData) {
    renderUserProfile(profileData);
  } else {
    window.location.href = "./login.html";
  }
}
