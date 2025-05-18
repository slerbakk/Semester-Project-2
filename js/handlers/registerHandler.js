import { registerUser } from "../auth/registerUser.js";
import { displayMessage } from "../components/displayMessage.js";

export function registerHandler() {
  const registerForm = document.querySelector("#register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const messageContainer = "#message";
  if (data.bio.trim() === "") {
    delete data.bio;
  }

  if (data.avatarUrl.trim() === "") {
    delete data.avatarUrl;
  } else {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${data.name}'s profile picture`,
    };
    delete data.avatarUrl;
  }

  if (data.bannerUrl.trim() === "") {
    delete data.bannerUrl;
  } else {
    data.banner = {
      url: data.bannerUrl,
      alt: `${data.name}'s banner image`,
    };
    delete data.bannerUrl;
  }

  // Get password and confirm password values
  const password = form.querySelector('input[name="password"]').value;
  const confirmPassword = form.querySelector(
    'input[name="confirm-password"]'
  ).value;

  // Check if passwords match
  if (password !== confirmPassword) {
    displayMessage(
      messageContainer,
      "red",
      "Passwords do not match. Please make sure both passwords are identical."
    );
    return; // Stop form submission if passwords don't match
  }

  const fieldset = form.querySelector("fieldset");
  try {
    // Disable the form while processing
    fieldset.disabled = true;
    await registerUser(data);
    // Display success message
    displayMessage(
      messageContainer,
      "green",
      "Successfully registered. Please <a href='./login.html' class='font-semibold underline'>login.</a>"
    );
    // Redirect to home page after 2 seconds
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 2000);
  } catch (error) {
    displayMessage(messageContainer, "red", error.message);
  } finally {
    // Re-enable the form after processing
    fieldset.disabled = false;
  }
}
