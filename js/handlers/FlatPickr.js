const COUNT_YEARS = 5

const now = new Date()
const maxYear = now.getFullYear() + COUNT_YEARS
const minYear = now.getFullYear() - COUNT_YEARS
const minDateString = `${minYear}-12-31`
const maxDateString = `${maxYear}-12-31`

export function initDatePicker() {
  flatpickr("#date-select", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: minDateString,
    maxDate: maxDateString,
  });
}

export function switchFlatPickrTheme() {
  const flatpickrStylesheet = document.querySelector("#flatpickr-css")

  if (document.body.classList.contains("dark")) {
    flatpickrStylesheet.href = "https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/dark.css"
  } else {
    flatpickrStylesheet.href = "https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/material_blue.css"
  }
}