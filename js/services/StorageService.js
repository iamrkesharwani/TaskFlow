const TASKS_KEY = "tasks"

export function saveTasks(tasksArray) {
  const stringData = JSON.stringify(tasksArray)
  localStorage.setItem(TASKS_KEY, stringData)
}

export function loadTasks() {
  const storedData = localStorage.getItem(TASKS_KEY)
  return storedData ? JSON.parse(storedData) : []
}