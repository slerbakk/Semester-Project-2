export async function updateProfile() {
  // Fetch the profile name from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.name) {
    alert("No user is logged in. Please log in to update your profile.");
    return;
  }
  const profileName = user.name; // Get the profile name from localStorage
  const url = `https://v2.api.noroff.dev/auction/profiles/${profileName}`;

  // Dynamically build the payload
  const payload = {};
  const bio = document.getElementById("bio").value;
  const avatarUrl = document.getElementById("avatar-url").value;
  const bannerUrl = document.getElementById("banner-url").value;

  if (bio) {
    payload.bio = bio;
  }
  if (avatarUrl) {
    payload.avatar = { url: avatarUrl, alt: "User avatar" };
  }
  if (bannerUrl) {
    payload.banner = { url: bannerUrl, alt: "User banner" };
  }

  // Validate input
  if (Object.keys(payload).length === 0) {
    alert("Please provide at least one field to update.");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        "X-Noroff-API-Key": "f045f85d-83a1-47c8-ba1d-cebc9b804804",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating profile:", errorData);
      alert(`Failed to update profile: ${errorData.status}`);
      return;
    }

    const data = await response.json();
    alert("Profile updated successfully!");

    // Reload the page to reflect the updated profile
    window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the profile.");
  }
}

// Attach event listener to the "Update Profile" button
document.addEventListener("DOMContentLoaded", () => {
  const updateProfileButton = document.getElementById("update-profile-button");
  if (updateProfileButton) {
    updateProfileButton.addEventListener("click", updateProfile);
  }
});
