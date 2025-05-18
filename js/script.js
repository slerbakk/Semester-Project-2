import { router } from "./router.js";
import { renderNavbar } from "./handlers/renderNavbar.js";
import { renderFooter } from "./handlers/renderFooter.js";
document.addEventListener("DOMContentLoaded", () => {
  // Render the navbar on all pages
  renderNavbar();
  router();
  renderFooter();
});
