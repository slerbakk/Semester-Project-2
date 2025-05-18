export function renderNavbar() {
  const token = localStorage.getItem("LoginToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const header = document.querySelector("header > div");
  const currentPage = window.location.pathname;

  if (!header) return;

  // Clear existing header content
  header.innerHTML = `
    <div class="flex items-center justify-between w-full px-4 relative">
      <a href="index.html" class="flex-shrink-0">
        <img src="./img/logo.png" alt="Logo" class="h-[40px] w-auto" />
      </a>
      <nav class="font-helvetica relative">
        <button id="mobile-menu-button" class="lg:hidden text-ah-blue p-2 hover:text-ah-ctahover rounded-lg transition-colors duration-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path class="mobile-menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <!-- Desktop Menu -->
        <ul class="hidden lg:flex items-center  text-ah-blue text-lg" id="nav-menu">
          <li>
            <a href="./index.html" 
               class="px-3 py-2 rounded-lg hover:text-ah-ctahover transition-all duration-200 
               ${
                 currentPage === "/index.html" || currentPage === "/"
                   ? "font-semibold text-ah-ctahover"
                   : ""
               }">
               Home
            </a>
          </li>
          <li>
            <a href="./auctions.html" 
               class="px-3 py-2 rounded-lg hover:text-ah-ctahover transition-all duration-200
               ${
                 currentPage === "/auctions.html"
                   ? "font-semibold text-ah-ctahover"
                   : ""
               }">
               Auctions
            </a>
          </li>
          ${
            token
              ? `
            <li>
              <a href="./sell.html" 
                 class="px-3 py-2 rounded-lg hover:text-ah-ctahover transition-all duration-200
                 ${
                   currentPage === "/sell.html"
                     ? "font-semibold text-ah-ctahover"
                     : ""
                 }">
                 Sell
              </a>
            </li>
            <li>
              <a href="./profile.html" 
                 class="px-3 py-2 rounded-lg hover:text-ah-ctahover transition-all duration-200
                 ${
                   currentPage === "/profile.html"
                     ? "font-semibold text-ah-ctahover"
                     : ""
                 }">
                 Your Profile
              </a>
            </li>
            <li>
              <span class="text-ah-blue font-semibold px-3 py-2">Credits: ${
                user?.credits || 0
              }</span>
            </li>
            <li>
              <a href="#" id="sign-out" class="text-white bg-ah-cta rounded-lg px-5 py-3 hover:bg-ah-ctahover transition-all duration-200">
                Sign Out
              </a>
            </li>
          `
              : `
            <li>
              <a href="./register.html" 
                 class="px-3 py-2 rounded-lg hover:text-ah-ctahover transition-all duration-200
                 ${
                   currentPage === "/register.html"
                     ? "font-semibold text-ah-ctahover"
                     : ""
                 }">
                 Register
              </a>
            </li>
            <li>
              <a href="./login.html" 
                 class="text-white bg-ah-cta rounded-lg px-5 py-3 hover:bg-ah-ctahover transition-all duration-200">
                 Sign In
              </a>
            </li>
          `
          }
        </ul>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden lg:hidden absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 transform transition-all duration-200 ease-in-out z-50">
          <ul class="py-2 text-ah-blue text-lg divide-y divide-gray-100">
            <li>
              <a href="./index.html" 
                 class="block px-4 py-3 hover:text-ah-ctahover transition-all duration-200
                 ${
                   currentPage === "/index.html" || currentPage === "/"
                     ? "font-semibold text-ah-ctahover"
                     : ""
                 }">
                 Home
              </a>
            </li>
            <li>
              <a href="./auctions.html" 
                 class="block px-4 py-3 hover:text-ah-ctahover transition-all duration-200
                 ${
                   currentPage === "/auctions.html"
                     ? "font-semibold text-ah-ctahover"
                     : ""
                 }">
                 Auctions
              </a>
            </li>
            ${
              token
                ? `
              <li>
                <a href="./sell.html" 
                   class="block px-4 py-3 hover:text-ah-ctahover transition-all duration-200
                   ${
                     currentPage === "/sell.html"
                       ? "font-semibold text-ah-ctahover"
                       : ""
                   }">
                   Sell
                </a>
              </li>
              <li>
                <a href="./profile.html" 
                   class="block px-4 py-3 hover:text-ah-ctahover transition-all duration-200
                   ${
                     currentPage === "/profile.html"
                       ? "font-semibold text-ah-ctahover"
                       : ""
                   }">
                   Your Profile
                </a>
              </li>
              <li class="px-4 py-3">
                <span class="text-ah-blue font-semibold">Credits: ${
                  user?.credits || 0
                }</span>
              </li>
              <li class="p-4">
                <a href="#" id="mobile-sign-out" 
                   class="block w-full text-center text-white bg-ah-cta rounded-lg px-5 py-3 hover:bg-ah-ctahover transition-all duration-200">
                  Sign Out
                </a>
              </li>
            `
                : `
              <li>
                <a href="./register.html" 
                   class="block px-4 py-3 hover:text-ah-ctahover transition-all duration-200
                   ${
                     currentPage === "/register.html"
                       ? "font-semibold text-ah-ctahover"
                       : ""
                   }">
                   Register
                </a>
              </li>
              <li class="p-4">
                <a href="./login.html" 
                   class="block w-full text-center text-white bg-ah-cta rounded-lg px-5 py-3 hover:bg-ah-ctahover transition-all duration-200">
                   Sign In
                </a>
              </li>
            `
            }
          </ul>
        </div>
      </nav>
    </div>
  `;

  // Add event listeners for mobile menu
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      // Update mobile menu icon
      const menuIcon = mobileMenuButton.querySelector(".mobile-menu-icon");
      if (menuIcon) {
        menuIcon.setAttribute(
          "d",
          isExpanded ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
        );
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !mobileMenuButton.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        mobileMenu.classList.add("hidden");
        const menuIcon = mobileMenuButton.querySelector(".mobile-menu-icon");
        if (menuIcon) {
          menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
        }
      }
    });
  }

  // Add event listeners for sign out buttons
  [
    document.getElementById("sign-out"),
    document.getElementById("mobile-sign-out"),
  ].forEach((button) => {
    if (button) {
      button.addEventListener("click", () => {
        localStorage.removeItem("LoginToken");
        localStorage.removeItem("user");
        window.location.href = "./index.html";
      });
    }
  });
}
