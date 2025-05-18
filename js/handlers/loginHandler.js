import { loginUser } from "../auth/loginUser.js";
import { displayMessage } from "../components/displayMessage.js";

export function loginHandler() {
  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const messageContainer = "#message";

  const fieldset = form.querySelector("fieldset");
  try {
    // Disable the form while processing
    fieldset.disabled = true;
    await loginUser(data);
    //Display success message
    displayMessage(
      messageContainer,
      "green",
      "Successfully logged in. <br>Redirecting to your profile..."
    );
    //Redirect to home page after 2 seconds
    setTimeout(() => {
      window.location.href = "./profile.html";
    }, 2000);
  } catch (error) {
    displayMessage(messageContainer, "red", error.message);
  } finally {
    // Re-enable the form after processing
    fieldset.disabled = false;
  }
}
