// LocalStorage import

import { loadTasks } from '../services/StorageService.js';
import { saveTasks } from '../services/StorageService.js';
import { updateAllTasksUI } from "../services/ShowText.js";
import { showMessage } from '../services/ShowText.js';

// Variables Store

export const taskModal = document.querySelector("#task-modal")
export const taskTitleInput = document.querySelector("#task-title-input")
export const prioritySelect = document.querySelector("#priority-select")
export const categorySelect = document.querySelector("#category-select")
export const dateSelect = document.querySelector("#date-select")
export const descriptionInput = document.querySelector("#description-input")
export const titleError = document.querySelector("#title-error")
export const taskContainer = document.querySelector("#task-container")
export const template = document.querySelector("#one-task-template")
export const modalCancelBtn = document.querySelector("#modal-cancel-button")
export const emptyStateMsg = document.querySelector("#empty-state")
export const searchInput = document.querySelector("#search-input")
export const addTaskBtn = document.querySelectorAll("#add-task-button")


// Edit mode

let isEditMode = false
let editTaskId = null

// Modal open/close

export function setupTaskModal() {
  addTaskBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      taskModal.classList.remove("hidden")
    })
  })

  modalCancelBtn.addEventListener("click", () => {
    taskModal.classList.add("hidden")
  })

  taskModal.addEventListener("click", (e) => {
    if (e.target === taskModal) {
      taskModal.classList.add("hidden")
    }
  })

  document.addEventListener("keydown", (e) => {
    if (!taskModal.classList.contains("hidden") && e.key === "Escape") {
      taskModal.classList.add("hidden")
    }
  })

  updateAllTasksUI()
  noTaskMessage()
}

// Task Creation & More

function createTaskCardElement(task) {
  // Clone Template
  const clone = template.content.cloneNode(true)
  const checkbox = clone.querySelector("input[type='checkbox']")
  const taskMetaDiv = clone.querySelector("#one-task-meta")
  const taskTitle = clone.querySelector("#one-task-title")
  const moreOptionsButton = clone.querySelector("#more-options-button")
  const moreOptionsMenu = clone.querySelector("#more-options-menu")
  const deleteButton = clone.querySelector("#delete-button")
  const editButton = clone.querySelector("#edit-button")
  const taskCard = clone.querySelector("#one-task-card")
  const taskDescription = clone.querySelector("#one-task-description")

  // Show description on click
  taskCard.addEventListener("click", (e) => {
    if (task.description.trim() !== "" && e.target !== checkbox) {
      taskDescription.classList.toggle("hidden")
    }
  })

  // Set values
  checkbox.setAttribute("data-id", task.id)
  checkbox.checked = task.completed
  taskTitle.textContent = task.title
  taskDescription.textContent = task.description

  // Complete task UI
  if (task.completed) {
    taskCard.classList.add("opacity-60")
    taskTitle.classList.add("line-through")
  } else {
    taskCard.classList.remove("opacity-60")
    taskTitle.classList.remove("line-through")
  }

  // Meta Badges
  taskMetaDiv.innerHTML = ""
  const metaElements = generateMetaElements(task)
  metaElements.forEach(element => {
    taskMetaDiv.appendChild(element)
  });

  // More Options Menu (Toggle + Close)
  moreOptionsButton.addEventListener("click", (e) => {
    e.stopPropagation()
    moreOptionsMenu.classList.toggle("hidden")
  })

  document.addEventListener("click", () => {
    moreOptionsMenu.classList.add("hidden")
  })

  // Delete Button
  deleteButton.addEventListener("click", (event) => {
    const taskCard = event.target.closest("#one-task-card")
    const taskIDString = checkbox.getAttribute("data-id")
    const taskID = Number(taskIDString)

    let tasks = loadTasks()
    tasks = tasks.filter((task) => {
      return task.id !== taskID
    })
    saveTasks(tasks)
    showMessage("Task deleted", "success");
    taskCard.remove()
    updateAllTasksUI()
    noTaskMessage()
  })

  // Edit button
  editButton.addEventListener("click", () => {
    isEditMode = true
    editTaskId = task.id

    taskModal.classList.remove("hidden")

    taskTitleInput.value = task.title
    descriptionInput.value = task.description;
    prioritySelect.value = task.priority;
    categorySelect.value = task.category;
    dateSelect.value = task.date;

    const submitBtn = document.querySelector("#modal-create-button")
    if (isEditMode) {
      submitBtn.innerHTML = `Update Task`
    }
  })

  // Inline Edit
  taskTitle.addEventListener("dblclick", (e) => {
    const currentText = taskTitle.textContent

    const input = document.createElement("input")
    input.type = "text"
    input.value = currentText

    taskTitle.replaceWith(input)
    input.focus()

    let saved = false

    const saveChanges = () => {
      if (saved || !input.isConnected) return
      saved = true

      const newTitle = input.value.trim()
      if (newTitle === "") return

      let tasks = loadTasks()
      const index = tasks.findIndex(t => t.id === task.id)
      if (index !== -1) {
        tasks[index].title = newTitle
        saveTasks(tasks)
      }

      const newtitleElement = document.createElement("h3")
      newtitleElement.textContent = newTitle
      newtitleElement.classList.add("one-task-title")

      input.replaceWith(newtitleElement)
    }

    const onBlurHandler = () => {
      saveChanges()
      input.removeEventListener("blur", onBlurHandler)
      input.removeEventListener("keydown", onKeydownHandler)
    }
    input.addEventListener("blur", onBlurHandler)

    const onKeydownHandler = (e) => {
      if (e.key === "Enter") {
        saveChanges()
        input.removeEventListener("keydown", onKeydownHandler)
        input.removeEventListener("blur", onBlurHandler)
      }
    }
    input.addEventListener("keydown", onKeydownHandler)
    updateAllTasksUI()
  })

  updateAllTasksUI()
  noTaskMessage()
  return clone
}

export function handleTaskSubmit() {
  taskModal.addEventListener("submit", (e) => {
    e.preventDefault()
    let tasks = []
    tasks = loadTasks()

    // Validation for empty title in modal
    if (taskTitleInput.value.trim() === "") {
      titleError.classList.remove("hidden")
      taskTitleInput.classList.add("error-title-border")
      taskTitleInput.focus()
      return
    } else {
      titleError.classList.add("hidden")
      taskTitleInput.classList.remove("error-title-border")
    }

    if (isEditMode) {
      const index = tasks.findIndex(t => t.id === editTaskId)

      if (index !== -1) {
        tasks[index].title = taskTitleInput.value.trim()
        tasks[index].priority = prioritySelect.value
        tasks[index].category = categorySelect.value
        tasks[index].date = dateSelect.value
        tasks[index].description = descriptionInput.value.trim()
      }

      saveTasks(tasks)
      showMessage("Task updated successfully!", "info");
      taskContainer.innerHTML = ""
      loadAndRenderTasks()
      updateAllTasksUI()
      noTaskMessage()
      taskModal.reset()
      taskModal.classList.add("hidden")

      isEditMode = false
      editTaskId = null
      return
    }

    // Create new task object
    const newTask = {
      id: Date.now(),
      title: taskTitleInput.value.trim(),
      priority: prioritySelect.value,
      category: categorySelect.value,
      date: dateSelect.value,
      description: descriptionInput.value.trim(),
      completed: false
    }

    // Save in array + localStorage
    tasks.push(newTask)
    saveTasks(tasks)
    showMessage("Task created successfully!", "success");

    // Create DOM card
    const card = createTaskCardElement(newTask)
    taskContainer.appendChild(card)

    // Reset modal
    taskModal.reset()
    taskModal.classList.add("hidden")
    updateAllTasksUI()
    noTaskMessage()
  })

  // Live input validation
  taskTitleInput.addEventListener("input", () => {
    if (taskTitleInput.value.trim() === "") {
      titleError.classList.remove("hidden")
      taskTitleInput.classList.add("error-title-border")
      taskTitleInput.focus()
    } else {
      titleError.classList.add("hidden")
      taskTitleInput.classList.remove("error-title-border")
    }
    updateAllTasksUI()
    noTaskMessage()
  })
}

// Checkbox toggle

export function setupCheckboxToggle() {
  taskContainer.addEventListener("change", (e) => {
    if (e.target.matches("input[type='checkbox']")) {
      const checkbox = e.target

      const taskCard = checkbox.closest("#one-task-card")
      const strikeTitle = taskCard.querySelector("#one-task-title")
      const taskID = Number(checkbox.getAttribute("data-id"))
      let tasks = loadTasks()

      const taskIndex = tasks.findIndex((task) => {
        return task.id === taskID
      })

      if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed
        saveTasks(tasks)

        if (tasks[taskIndex].completed) {
          taskCard.classList.add("opacity-60")
          strikeTitle.classList.add("line-through")
        } else {
          taskCard.classList.remove("opacity-60")
          strikeTitle.classList.remove("line-through")
        }
      }
    }
    updateAllTasksUI()
    noTaskMessage()
  })
}

// Render Tasks

function renderTask(task) {
  const card = createTaskCardElement(task);
  taskContainer.appendChild(card);
}

// Load & Render Tasks

export function loadAndRenderTasks() {
  const tasks = loadTasks()
  noTaskMessage()
  tasks.forEach(task => {
    renderTask(task)
  });
}

// Generating Task Meta Elements

export function generateMetaElements(task) {
  const metaElements = []

  // Priority badge
  if (task.priority && task.priority !== "Select Priority") {
    const prioritySpan = document.createElement("span")
    prioritySpan.classList.add("template-for-priority")
    prioritySpan.textContent = task.priority

    if (task.priority === "High") {
      prioritySpan.classList.add("red-priority")
    } else if (task.priority === "Medium") {
      prioritySpan.classList.add("yellow-priority")
    } else if (task.priority === "Low") {
      prioritySpan.classList.add("green-priority")
    }

    metaElements.push(prioritySpan)
  }

  // Category Icon
  const categoryIcons = {
    Personal: "fa-solid fa-house",
    Shopping: "fa-solid fa-cart-shopping",
    Health: "fa-solid fa-heart-pulse",
    Work: "fa-solid fa-briefcase",
    Other: "fa-solid fa-ellipsis"
  }

  if (task.category && task.category !== "Select Category") {
    const categorySpan = document.createElement("span")
    categorySpan.classList.add("template-for-category")

    const iconClass = categoryIcons[task.category]
    categorySpan.innerHTML = `<i class="${iconClass} mr-1"></i>${task.category}`

    metaElements.push(categorySpan)
  }

  // Due date badge
  if (task.date.trim() !== "") {
    const dateObject = new Date(task.date)
    const formattedDate = dateObject.toLocaleString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    const dueDateSpan = document.createElement("span")
    dueDateSpan.classList.add("template-for-date")

    const now = new Date()
    const timeLeft = dateObject - now
    const hoursLeft = timeLeft / (1000 * 60 * 60)
    const overdueTime = new Date(task.date)

    if (hoursLeft > 0 && hoursLeft <= 24 || overdueTime < now) {
      dueDateSpan.classList.add("text-red-500", "font-semibold")
    } else {
      dueDateSpan.classList.add("text-slate-600", "font-semibold")
    }

    dueDateSpan.innerHTML = `<i class="fa-solid fa-calendar text-black text-slate-800 dark:text-slate-300">
      </i> <span class="text-slate-800 text-slate-800 dark:text-slate-300">Due:</span> ${formattedDate}`

    metaElements.push(dueDateSpan)
  }
  updateAllTasksUI()
  noTaskMessage()
  return metaElements
}

// No Task Message Hide

export function noTaskMessage() {
  const tasks = loadTasks()
  if (tasks.length > 0) {
    emptyStateMsg.classList.add("hidden")
  } else {
    emptyStateMsg.classList.remove("hidden")
  }
}

// To Do search

function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay);
  }
}

export function handleSearch(query) {
  const tasks = loadTasks()

  if (!query.trim()) {
    taskContainer.innerHTML = ""
    loadAndRenderTasks()
    return
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(query.toLowerCase()) ||
    task.description.toLowerCase().includes(query.toLowerCase())
  )

  taskContainer.innerHTML = ""
  filteredTasks.forEach(renderTask)
}

export const debounceSearch = debounce(handleSearch, 300)

searchInput.addEventListener("input", (e) => {
  debounceSearch(e.target.value)
})

// Sort Options

export function initsortTasks() {
  const sortModal = document.querySelector("#sort-modal")
  const sortModalBtn = document.querySelector("#sort-button")
  const sortBySelect = document.querySelector("#sort-by")
  const sortOrderSelect = document.querySelector("#sort-order")
  const sortResetBtn = document.querySelector("#sort-reset-button")
  const sortApplyBtn = document.querySelector("#sort-apply-button")
  const sortModalClose = document.querySelector("#sort-modal-close")
  let tasks = loadTasks()

  sortModalBtn.addEventListener("click", () => {
    sortModal.classList.remove("hidden")
  })

  document.addEventListener("keydown", (e) => {
    if (!sortModal.classList.contains("hidden") && e.key === "Escape") {
      sortModal.classList.add("hidden")
    }
  })

  sortModal.addEventListener("click", (e)=> {
    if (e.target === sortModal) {
      sortModal.classList.add("hidden")
    }
  })

  sortModalClose.addEventListener("click", (e) => {
    e.preventDefault()
    sortModal.classList.add("hidden")
  })

  if (sortApplyBtn) {
    sortApplyBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const sortBy = sortBySelect.value
      const sortOrder = sortOrderSelect.value

      tasks.sort((a, b) => {
        if (sortBy === "dueDate") {
          const da = new Date(a.date || 0)
          const db = new Date(b.date || 0)
          return sortOrder === "asc" ? da - db : db - da
        }

        if (sortBy === "priority") {
          const order = { High: 1, Medium: 2, Low: 3 }
          return sortOrder === "asc"
            ? order[a.priority] - order[b.priority]
            : order[b.priority] - order[a.priority]
        }

        if (sortBy === "title") {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        }
        return 0
      })

      taskContainer.innerHTML = ""
      tasks.forEach(renderTask)
      showMessage("Tasks sorted", "success");
      updateAllTasksUI()
      noTaskMessage()
      sortModal.classList.add("hidden")
    })
  }

  if (sortResetBtn) {
    sortResetBtn.addEventListener("click", (e) => {
      e.preventDefault()
      sortBySelect.value = "dueDate"
      sortOrderSelect.value = "asc"
      taskContainer.innerHTML = ""
      loadAndRenderTasks()
      updateAllTasksUI()
      noTaskMessage()
      sortModal.classList.add("hidden")
      showMessage("Sort reset", "info");
    })
  }

}

// Filter Options

export function initfilterTasks() {
  const filterModal = document.querySelector("#filter-modal")
  const filterModalBtn = document.querySelector("#filter-button")
  const categorySelect = document.querySelector("#filter-category")
  const prioritySelect = document.querySelector("#filter-priority")
  const dateSelect = document.querySelector("#filter-date")
  const filterClearBtn = document.querySelector("#clear-filter")
  const filterApplyBtn = document.querySelector("#apply-filter")
  const filterModalClose = document.querySelector("#filter-modal-close")

  filterModalBtn.addEventListener("click", () => {
    filterModal.classList.remove("hidden")
  })

  filterModalClose.addEventListener("click", (e) => {
    e.preventDefault()
    filterModal.classList.add("hidden")
  })

  filterModal.addEventListener("click", (e) => {
    if (e.target === filterModal) {
      filterModal.classList.add("hidden")
    }
  })

  filterClearBtn.addEventListener("click", (e) => {
    e.preventDefault()
    categorySelect.value = ""
    prioritySelect.value = ""
    dateSelect.value = "all-dates"
    taskContainer.innerHTML = ""
    loadAndRenderTasks()
    updateAllTasksUI()
    noTaskMessage()
    filterModal.classList.add("hidden")
    showMessage("Filters cleared", "info");
  })

  filterApplyBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const filters = {
      category: categorySelect.value,
      priority: prioritySelect.value,
      dueDate: dateSelect.value
    }

    let tasks = loadTasks()
    const now = new Date()

    tasks = tasks.filter(task => {
      let matchCategory = !filters.category || task.category?.toLowerCase() === filters.category.toLowerCase()

      let matchPriority = !filters.priority || task.priority?.toLowerCase() === filters.priority.toLowerCase()

      let matchDueDate = true

      if (filters.dueDate && filters.dueDate !== "all-dates") {
        const taskDate = task.date ? new Date(task.date) : null
        if (filters.dueDate === "overdue" && taskDate) {
          matchDueDate = taskDate < now
        } else if (filters.dueDate === "today" && taskDate) {
          matchDueDate = taskDate.toDateString() === now.toDateString()
        } else if (filters.dueDate === "this-week" && taskDate) {
          const weeksFromNow = new Date()
          weeksFromNow.setDate(now.getDate() + 7)
          matchDueDate = taskDate >= now && taskDate <= weeksFromNow
        } else if (filters.dueDate === "later" && taskDate) {
          const weeksFromNow = new Date()
          weeksFromNow.setDate(now.getDate() + 7)
          matchDueDate = taskDate > weeksFromNow
        } else if (filters.dueDate === "none") {
          matchDueDate = !task.date
        }
      }
      return matchCategory && matchDueDate && matchPriority
    })

    taskContainer.innerHTML = ""
    tasks.forEach(renderTask)
    if (tasks.length === 0) {
      showMessage("No tasks match your filters", "info");
    } else {
      showMessage("Filters applied", "success");
    }
    updateAllTasksUI()
    noTaskMessage()
    filterModal.classList.add("hidden")
  })
}