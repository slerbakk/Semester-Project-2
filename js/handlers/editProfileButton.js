import { updateProfile } from "../auth/updateProfile.js";

export function setupEditProfileButton() {
  const editProfileButton = document.getElementById("edit-profile-button");
  const updateProfileSection = document.getElementById("update-profile");
  const updateProfileButton = document.getElementById("update-profile-button");

  if (editProfileButton && updateProfileSection) {
    editProfileButton.addEventListener("click", () => {
      // Toggle visibility of the update profile form
      updateProfileSection.classList.toggle("hidden");
    });
  }

  if (updateProfileButton) {
    updateProfileButton.addEventListener("click", updateProfile);
  }
}
