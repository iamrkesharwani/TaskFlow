import { handleSearch, debounceSearch } from "./TaskHandler.js";

const header = document.querySelector("header");
const headerHeight = document.querySelector("header").offsetHeight;
const headerSection = header.querySelector("section")
const appInfo = document.querySelector("#app-info");
const sidebar = document.querySelector("#sidebar");
const sidebarToggleBtn = document.querySelector("#sidebar-toggle");
const searchMobileIcon = document.querySelector("#search-mobile-icon");

export function sidebarToggle() {
  sidebarToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  })
}

export function setSideBarHeight() {
  if (window.innerWidth < 768) {
    sidebar.style.height = `${window.innerHeight - headerHeight}px`;
  } else {
    sidebar.style.height = "";
  }
}

export function searchExpand() {
  const mobileSearchContainer = document.createElement("div");
  mobileSearchContainer.id = "mobile-search-container";
  mobileSearchContainer.className = "hidden w-full flex items-center gap-3";
  mobileSearchContainer.innerHTML = `
        <button id="search-back-button" class="text-blue-600">
            <i class="fa-solid fa-arrow-left text-lg dark:text-blue-300"></i>
        </button>
        <div class="relative flex-1">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 transform text-base text-blue-400 dark:text-blue-300"></i>
            <input
                id="mobile-search-input"
                type="text"
                class="w-full h-10 rounded-lg bg-white/80 pl-10 pr-4 text-sm placeholder-slate-400 shadow-soft border-0 focus:bg-white focus:shadow-glow dark:bg-slate-700 dark:text-white"
                placeholder="Search tasks..."
                style="border: none !important; outline: none !important"
            />
        </div>
        `
  header.insertBefore(mobileSearchContainer, headerSection)

  const searchBackButton = document.querySelector("#search-back-button")
  const mobileSearchInput = document.querySelector("#mobile-search-input")

  function showMobileSearch() {
    appInfo.classList.add("hidden")
    headerSection.classList.add("hidden")
    mobileSearchContainer.classList.remove("hidden")
    mobileSearchContainer.classList.add("flex")
    mobileSearchInput.focus()
  }

  function hideMobileSearch() {
    appInfo.classList.remove("hidden")
    headerSection.classList.remove("hidden")
    mobileSearchContainer.classList.add("hidden")
    mobileSearchContainer.classList.remove("flex")
    mobileSearchInput.value = ""

    handleSearch("")
  }

  searchMobileIcon.addEventListener("click", (e) => {
    e.preventDefault()
    showMobileSearch()
  })

  searchBackButton.addEventListener("click", (e) => {
    e.preventDefault()
    hideMobileSearch()
  })

  mobileSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideMobileSearch()
    }
  })

  mobileSearchInput.addEventListener("input", (e) => {
    debounceSearch(e.target.value)
  })

  return {
    showSearch: showMobileSearch,
    hideSearch: hideMobileSearch,
    getSearchTerm: () => mobileSearchInput.value
  }
}
