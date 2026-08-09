interface Task {
  content: string;
  completed: boolean;
}

const input = document.getElementById("todoInput") as HTMLInputElement;
const form = document.getElementById("todoForm") as HTMLFormElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const interativeSection = document.getElementById(
  "interative-section",
) as HTMLDivElement;

let tasks: Task[] = readTasks();

tasks.forEach((task) => createTaskElement(task));

if (tasks.length > 0) {
  handleResetButton();
}

noTaskMessage();

getCurrentYear();

// console.log(button);

function handleReset(): void {
  tasks = [];
  localStorage.removeItem("tasks");
  todoList.innerHTML = "";

  const resetButton = document.getElementById("reset");

  noTaskMessage();

  if (resetButton) {
    resetButton.remove();
  }
}

function noTaskMessage(): void {
  const messageParagrapgh = document.getElementById("messageParagrapgh");
  if (tasks.length === 0 && !messageParagrapgh) {
    const message = document.createElement("p");
    message.textContent = "No tasks found";
    message.id = "messageParagrapgh";
    message.classList.add("text-center", "font-light");
    interativeSection.firstElementChild?.after(message);
  } else if (tasks.length > 0 && messageParagrapgh) {
    messageParagrapgh.remove();
  }
}

function getCurrentYear(): void {
  const dateField = document.querySelector("#date") as HTMLParagraphElement;
  const date = new Date();
  dateField.textContent = `${date.getFullYear()}`;
}

function handleResetButton(): void {
  if (document.getElementById("reset")) {
    return;
  }
  const resetBtn = document.createElement("button");
  resetBtn.id = "reset";
  resetBtn.textContent = "Clear all tasks";
  resetBtn.addEventListener("click", handleReset);
  resetBtn.classList.add(
    "w-full",
    "p-2",
    "mt-2",
    "bg-red-600",
    "border-none",
    "rounded-lg",
    "text-white",
    "hover:bg-red-700",
    "cursor-pointer",
  );

  form.after(resetBtn);
}

function readTasks(): Task[] {
  const retrievedTasks = localStorage.getItem("tasks");
  if (retrievedTasks === null) {
    return [];
  }
  return JSON.parse(retrievedTasks);
}

function handleSubmit(event: SubmitEvent): void {
  event.preventDefault();

  if (!input.value) {
    return;
  }

  // create new task
  const newTask: Task = {
    content: input.value,
    completed: false,
  };

  tasks.push(newTask);
  // add new task to task array
  createTaskElement(newTask);

  saveTasks();

  handleResetButton();
  // clear the input after submit
  input.value = "";
}

function saveTasks(): void {
  // add to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(task: Task): void {
  // update the UI

  // create new elements
  const newLi = document.createElement("li");
  const checkBox = document.createElement("input");
  const contentParagrapgh = document.createElement("p");
  const deleteButton = document.createElement("button");

  // setting-up checkbox and current value
  checkBox.type = "checkbox";
  checkBox.checked = task.completed;
  checkBox.checked
    ? (contentParagrapgh.style.textDecoration = "line-through") &&
      (contentParagrapgh.style.color = "rgba(255, 255, 255, 0.5)")
    : (contentParagrapgh.style.textDecoration = "none") &&
      (contentParagrapgh.style.color = "rgb(255, 255, 255");
  checkBox.classList.add("w-5", "h-5", "accent-indigo-600", "cursor-pointer");

  // setting-up list element
  contentParagrapgh.classList.add("m-0");
  newLi.classList.add(
    "flex",
    "items-center",
    "border",
    "border-white/10",
    "p-2",
    "rounded-xl",
    "mb-2",
    "bg-white/5",
  );
  contentParagrapgh.classList.add("px-2");

  // setting-up button
  deleteButton.append("Remove");
  deleteButton.classList.add(
    "py-2",
    "bg-indigo-600",
    "border-none",
    "rounded-lg",
    "text-white",
    "hover:bg-indigo-700",
    "cursor-pointer",
    "ml-auto",
  );

  // add event listener for check box
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      (contentParagrapgh.style.textDecoration = "line-through") &&
        (contentParagrapgh.style.color = "rgba(255, 255, 255, 0.5)");
    } else {
      (contentParagrapgh.style.textDecoration = "none") &&
        (contentParagrapgh.style.color = "rgb(255, 255, 255");
    }
    task.completed = checkBox.checked;
    saveTasks();
  });

  // add event lister for the remove button
  deleteButton.addEventListener("click", () => {
    newLi.remove();
    tasks = tasks.filter((t) => t !== task);
    saveTasks();
    noTaskMessage();
    if (tasks.length === 0) {
      document.querySelector("#reset")?.remove();
    }
  });

  // updating the DOM
  noTaskMessage();
  contentParagrapgh.append(task.content);
  newLi.append(contentParagrapgh);
  newLi.prepend(checkBox);
  todoList.append(newLi);

  newLi.append(deleteButton);
}

form.addEventListener("submit", handleSubmit);
