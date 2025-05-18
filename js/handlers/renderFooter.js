export function renderFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.className =
    "border-t-[1px] flex-col md:flex-row max-w-[1080px] mx-auto mb-6 bg-white rounded-b-md min-h-[200px] flex justify-between text-ah-blue px-20 font-poppins";

  footer.innerHTML = `
      <div class="w-full md:w-1/3 flex flex-col py-6 text-left">
        <h4 class="text-2xl pb-3">About Us</h4>
        <p class="tracking-[0.1rem]">
          Auction House connects collectors with rare treasures. With a passion
          for exceptional items, we provide a secure platform for buyers and
          sellers.
        </p>
      </div>
      <div class="w-full md:w-1/3 flex flex-col py-6 md:px-20 text-left">
        <h5 class="text-2xl pb-3">Questions?</h5>
        <p class="pb-3">Contact email:</p>
        <a
          href="#"
          class="hover:text-ah-ctahover hover:underline transition hover: duration-150 pb-2"
        >
          📧info@auction.no
        </a>
        <p class="pb-2">📞521-582-9612</p>
        <p>📫356 Koch Wall, Fort Jettie, Idaho - 47781, Aruba</p>
      </div>
      <div class="w-full md:w-1/3 flex flex-col py-6 md:px-20 text-left">
        <h6 class="text-2xl pb-3">Helpful Links</h6>
        <a
          href="#"
          class="hover:text-ah-ctahover hover:underline transition hover: duration-150 pb-2"
        >
          Terms of Service
        </a>
        <a
          href="#"
          class="hover:text-ah-ctahover hover:underline transition hover: duration-150 pb-2"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          class="hover:text-ah-ctahover hover:underline transition hover: duration-150"
        >
          FAQ
        </a>
      </div>
    `;
}
