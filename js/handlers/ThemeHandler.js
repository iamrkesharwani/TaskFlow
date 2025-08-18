import { switchFlatPickrTheme } from "./FlatPickr.js";

export function darkModeSet() {
  const buttons = document.querySelectorAll("#dark-mode-button")

  function updateText() {
    const darkModeText = document.querySelector("#dark-mode-text")
    if (document.body.classList.contains("dark")) {
      darkModeText.textContent = "Light Mode"
    } else {
      darkModeText.textContent = "Dark Mode"
    }
  }

  function updateIcons() {
    buttons.forEach(button => {
      const icon = button.querySelector('i')
      if (document.body.classList.contains("dark")) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
      } else {
        icon.classList.add("fa-moon")
        icon.classList.remove("fa-sun")
      }
    })
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
      updateIcons()
      updateText()
      switchFlatPickrTheme()
    })
  })

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark")
    buttons.innerHTML = `<i class="fa-solid fa-sun"></i>`
  } else if (localStorage.getItem("theme") === "light") {
    document.body.classList.remove("dark")
  } else {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark")
    }
  }
  updateIcons()
  updateText()
  switchFlatPickrTheme()
}