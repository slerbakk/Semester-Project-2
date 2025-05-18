export function displayMessage(container, messageType, message) {
  let messageContainer = container;
  if (typeof container === "string") {
    messageContainer = document.querySelector(container);
  }
  messageContainer.innerHTML = `<p class="text-white bg-${messageType}-800 rounded  p-2 text-center ">${message}</p>`;
}
