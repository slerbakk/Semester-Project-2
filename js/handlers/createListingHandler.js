import { createListing } from "../auth/createListing.js";
import { displayMessage } from "../components/displayMessage.js";

export function createListingHandler() {
  const listingForm = document.querySelector("#listing-form");
  if (listingForm) {
    listingForm.addEventListener("submit", submitListingForm);
  }
}

async function submitListingForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const messageContainer = document.querySelector("#message");

  // Create the listing object based on API requirements
  const listing = {
    title: formData.get("title").trim(),
    endsAt: new Date(formData.get("endsAt")).toISOString(),
  };

  // Add optional fields if provided
  const description = formData.get("description").trim();
  if (description) {
    listing.description = description;
  }

  // Process the selected tag (category)
  const selectedCategory = formData.get("category").trim();
  if (selectedCategory) {
    // Always include the base "myauction" tag, plus the category-specific one
    listing.tags = ["myauction", `myauction${selectedCategory}`];
  }

  // Process media if URL is provided
  const mediaUrl = formData.get("mediaUrl").trim();
  const mediaAlt = formData.get("mediaAlt").trim();

  if (mediaUrl) {
    listing.media = [
      {
        url: mediaUrl,
        alt: mediaAlt || "Auction item image",
      },
    ];
  }

  try {
    // Disable form during submission
    const fieldset = form.querySelector("fieldset") || form;
    fieldset.disabled = true;

    // Call the API
    const response = await createListing(listing);

    // Display success message
    displayMessage(
      messageContainer,
      "green",
      "Your listing has been created successfully!"
    );

    // Reset the form
    form.reset();

    // Redirect to the listings page after a delay
    setTimeout(() => {
      window.location.href = "./auctions.html";
    }, 2000);
  } catch (error) {
    // Display error message
    displayMessage(messageContainer, "red", error.message);
  } finally {
    // Re-enable the form
    const fieldset = form.querySelector("fieldset") || form;
    fieldset.disabled = false;
  }
}
