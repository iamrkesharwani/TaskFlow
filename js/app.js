import { initDatePicker } from "./handlers/FlatPickr.js"
import { setupTaskModal } from "./handlers/TaskHandler.js"
import { handleTaskSubmit } from "./handlers/TaskHandler.js"
import { setupCheckboxToggle } from "./handlers/TaskHandler.js"
import { loadAndRenderTasks } from "./handlers/TaskHandler.js";
import { initsortTasks } from "./handlers/TaskHandler.js";
import { initfilterTasks } from "./handlers/TaskHandler.js";
import { initKeyboardShortcut } from "./services/KeyboardService.js";
import { updateAllTasksUI } from "./services/ShowText.js"
import { finishInitialization } from "./services/ShowText.js";
import { sidebarToggle } from "./handlers/Mobile.js";
import { setSideBarHeight } from "./handlers/Mobile.js";
import { searchExpand } from "./handlers/Mobile.js";
import { darkModeSet } from "./handlers/ThemeHandler.js"

document.addEventListener("DOMContentLoaded", () => {
  initDatePicker()
  setupTaskModal()
  handleTaskSubmit()
  setupCheckboxToggle()
  loadAndRenderTasks()
  updateAllTasksUI()
  initKeyboardShortcut()
  initsortTasks()
  initfilterTasks()
  setTimeout(() => {
    finishInitialization()
  }, 100);
  sidebarToggle()
  setSideBarHeight()
  searchExpand()
  darkModeSet()
})
