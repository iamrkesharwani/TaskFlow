import { loadTasks } from "./StorageService.js";

const totalCountEl = document.querySelector("#count-total");
const activeCountEl = document.querySelector("#count-active");
const completedCountEl = document.querySelector("#count-completed");
const overdueCountEl = document.querySelector("#count-overdue");
const highCountEl = document.querySelector("#count-high");
const mediumCountEl = document.querySelector("#count-medium");
const lowCountEl = document.querySelector("#count-low");
const personalCountEl = document.querySelector("#count-personal");
const shoppingCountEl = document.querySelector("#count-shopping");
const healthCountEl = document.querySelector("#count-health");
const workCountEl = document.querySelector("#count-work");
const otherCountEl = document.querySelector("#count-other");


function getTotalTasks(params) {
  return params.length
}
function getActiveTasks(params) {
  return params.filter(t => !t.completed).length
}
function getCompletedTasks(params) {
  return params.filter(t => t.completed).length
}
function getOverdueTasks(params) {
  const now = new Date()
  return params.filter(t => !t.completed && t.date && new Date(t.date) < now).length
}
function highPriorityTasks(params) {
  return params.filter(t => t.priority === "High").length
}
function mediumPriorityTasks(params) {
  return params.filter(t => t.priority === "Medium").length
}
function lowPriorityTasks(params) {
  return params.filter(t => t.priority === "Low").length
}
function personalCategoryTasks(params) {
  return params.filter(t => t.category === "Personal").length
}
function shoppingCategoryTasks(params) {
  return params.filter(t => t.category === "Shopping").length
}
function healthCategoryTasks(params) {
  return params.filter(t => t.category === "Health").length
}
function workCategoryTasks(params) {
  return params.filter(t => t.category === "Work").length
}
function otherCategoryTasks(params) {
  return params.filter(t => t.category === "Other").length
}

export function updateAllTasksUI() {
  const tasks = loadTasks()

  if (totalCountEl) totalCountEl.textContent = getTotalTasks(tasks) || 0
  if (activeCountEl) activeCountEl.textContent = getActiveTasks(tasks) || 0
  if (completedCountEl) completedCountEl.textContent = getCompletedTasks(tasks) || 0
  if (overdueCountEl) overdueCountEl.textContent = getOverdueTasks(tasks) || 0
  if (highCountEl) highCountEl.textContent = highPriorityTasks(tasks) || 0
  if (mediumCountEl) mediumCountEl.textContent = mediumPriorityTasks(tasks) || 0
  if (lowCountEl) lowCountEl.textContent = lowPriorityTasks(tasks) || 0
  if (personalCountEl) personalCountEl.textContent = personalCategoryTasks(tasks) || 0
  if (shoppingCountEl) shoppingCountEl.textContent = shoppingCategoryTasks(tasks) || 0
  if (healthCountEl) healthCountEl.textContent = healthCategoryTasks(tasks) || 0
  if (workCountEl) workCountEl.textContent = workCategoryTasks(tasks) || 0
  if (otherCountEl) otherCountEl.textContent = otherCategoryTasks(tasks) || 0
}

// Show Message

let isInitializing = true
let messageTimeout

export function showMessage(text, type = "info") {
  if (isInitializing) return

  const msgBox = document.querySelector("#app-message")
  if (!msgBox) return
  clearTimeout(messageTimeout)

  msgBox.textContent = text

  msgBox.classList.add("fixed", "top-5", "right-5", "z-50", "rounded-lg", "px-4", "py-2", "shadow-lg", "text-white")

  msgBox.classList.remove("bg-green-500", "bg-red-500", "bg-blue-500", "hidden");

  if (type === "success") {
    msgBox.classList.add("bg-green-500")
  } else if (type === "error") {
    msgBox.classList.add("bg-red-500")
  } else {
    msgBox.classList.add("bg-blue-500")
  }

  msgBox.classList.remove("hidden")

  messageTimeout = setTimeout(() => {
    msgBox.classList.add("hidden")
    msgBox.textContent = ""
  }, 2500);
}

export function finishInitialization() {
  isInitializing = false
}