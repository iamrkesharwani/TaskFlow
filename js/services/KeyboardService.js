import {
  updateAllTasksUI
} from "../services/ShowText.js"

import {
  noTaskMessage,
  loadAndRenderTasks,
  taskModal,
  taskTitleInput,
  taskContainer
} from "../handlers/TaskHandler.js"

export function initKeyboardShortcut() {
  document.addEventListener("keydown", handleKeydown)
}

function handleKeydown(e) {
  const activeE1 = document.activeElement
  const isInputFocused = activeE1 &&
    (activeE1.tagName === "INPUT"
      || activeE1.tagName === "TEXTAREA")

  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault()
    openNewTaskModal()
    noTaskMessage()
    updateAllTasksUI()
  }

  if (e.key === "Enter" && isInputFocused) {
    savedEditing()
    noTaskMessage()
    updateAllTasksUI()
  }

  if (e.key === "Escape") {
    cancelEditing()
    noTaskMessage()
    updateAllTasksUI()
  }
}

function openNewTaskModal() {
  taskModal.classList.remove("hidden")
  taskTitleInput.focus()
}

function cancelEditing() {
  if (!taskModal.classList.contains("hidden")) {
    taskModal.classList.add("hidden")
  }

  if (taskContainer.querySelectorAll("input[type='text']")) {
    loadAndRenderTasks()
  }
}

function savedEditing() {
  if (!taskModal.classList.contains("hidden")) {
    const submitEvent = new Event("submit", {bubbles: true, cancelable: true})
    taskModal.dispatchEvent(submitEvent)
  }
}