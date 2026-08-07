"use strict";
const input = document.getElementById("todoInput");
const form = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");
const interativeSection = document.getElementById("interative-section");
let tasks = readTasks();
tasks.forEach((task) => createTaskElement(task));
if (tasks.length > 0) {
    handleResetButton();
}
noTaskMessage();
getCurrentYear();
// console.log(button);
function handleReset() {
    tasks = [];
    localStorage.removeItem("tasks");
    todoList.innerHTML = "";
    const resetButton = document.getElementById("reset");
    noTaskMessage();
    if (resetButton) {
        resetButton.remove();
    }
}
function noTaskMessage() {
    var _a;
    const messageParagrapgh = document.getElementById("messageParagrapgh");
    if (tasks.length === 0 && !messageParagrapgh) {
        const message = document.createElement("p");
        message.textContent = "No tasks found";
        message.id = "messageParagrapgh";
        message.classList.add("text-center", "font-light");
        (_a = interativeSection.firstElementChild) === null || _a === void 0 ? void 0 : _a.after(message);
    }
    else if (tasks.length > 0 && messageParagrapgh) {
        messageParagrapgh.remove();
    }
}
function getCurrentYear() {
    const dateField = document.querySelector("#date");
    const date = new Date();
    dateField.textContent = `${date.getFullYear()}`;
}
function handleResetButton() {
    if (document.getElementById("reset")) {
        return;
    }
    const resetBtn = document.createElement("button");
    resetBtn.id = "reset";
    resetBtn.textContent = "Clear all tasks";
    resetBtn.addEventListener("click", handleReset);
    resetBtn.classList.add("w-full", "p-2", "mt-2", "bg-red-600", "border-none", "rounded-lg", "text-white", "hover:bg-red-700", "cursor-pointer");
    form.after(resetBtn);
}
function readTasks() {
    const retrievedTasks = localStorage.getItem("tasks");
    if (retrievedTasks === null) {
        return [];
    }
    return JSON.parse(retrievedTasks);
}
function handleSubmit(event) {
    event.preventDefault();
    if (!input.value) {
        return;
    }
    // create new task
    const newTask = {
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
function saveTasks() {
    // add to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function createTaskElement(task) {
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
        ? (contentParagrapgh.style.textDecoration = "line-through")
        : (contentParagrapgh.style.textDecoration = "none");
    checkBox.classList.add("w-5", "h-5", "accent-indigo-600", "cursor-pointer");
    // setting-up list element
    contentParagrapgh.classList.add("m-0");
    newLi.classList.add("flex", "items-center", "border", "border-white/10", "p-2", "rounded-xl", "mb-2", "bg-white/5");
    contentParagrapgh.classList.add("px-2");
    // setting-up button
    deleteButton.append("Remove");
    deleteButton.classList.add("py-2", "bg-red-600", "border-none", "rounded-xl", "text-white", "hover:bg-red-700", "cursor-pointer", "ml-auto");
    // add event listener for check box
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            contentParagrapgh.style.textDecoration = "line-through";
        }
        else {
            contentParagrapgh.style.textDecoration = "none";
        }
        task.completed = checkBox.checked;
        saveTasks();
    });
    // add event lister for the remove button
    deleteButton.addEventListener("click", () => {
        var _a;
        newLi.remove();
        tasks = tasks.filter((t) => t !== task);
        saveTasks();
        noTaskMessage();
        if (tasks.length === 0) {
            (_a = document.querySelector("#reset")) === null || _a === void 0 ? void 0 : _a.remove();
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
