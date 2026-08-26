# 📝 TypeScript Todo List

A Todo List web application built with **TypeScript** and vanilla DOM manipulation. Tasks can be added, completed, deleted, and cleared, with task data persisted using the browser's `localStorage`.

## 🖥️ Live Demo
https://type-script-todo-list-one.vercel.app/

## ✨ Features

* ➕ Add new tasks
* ☑️ Mark tasks as completed using checkboxes
* 🗑️ Delete individual tasks
* 🧹 Clear the entire task list
* 💾 Persist tasks using `localStorage`
* 🔄 Automatically restore saved tasks when the page is refreshed
* 🌐 Dynamically create and update DOM elements
* 🔷 Type-safe development using TypeScript
* 🎨 Styled using Tailwind CSS

## 🛠️ Technologies

* 🔷 TypeScript
* 🌐 HTML
* 🎨 Tailwind CSS
* 🖥️ Web APIs
  * DOM API
  * `localStorage`

## ⚙️ How It Works

Tasks are represented using a TypeScript interface:

```typescript
interface Task {
    content: string;
    completed: boolean;
}
```

Tasks are stored in an array and synchronised with `localStorage`.

When the application starts, saved tasks are retrieved from `localStorage` and rendered to the page.

When a task is added:

1. 🆕 A new `Task` object is created.
2. 📋 The task is added to the tasks array.
3. 🏗️ A corresponding `<li>` element is created in the DOM.
4. 💾 The updated task array is saved to `localStorage`.

Checkboxes update the `completed` property of the corresponding task object.

Deleting a task:

1. 🗑️ Removes its corresponding DOM element.
2. 📋 Removes the task from the tasks array.
3. 💾 Updates `localStorage`.

## 🚀 Running the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Compile TypeScript

```bash
tsc
```

For development, use TypeScript's watch mode:

```bash
tsc -w
```

### 3. Run the Tailwind CSS watcher

For development, use Tailwind CSS's watch mode:

```bash
npm run tailwind
```

### 4. Open the project

For development, open the project using **Lite server** by running:

```bash
npm run start
```

## 📁 Project Structure

```text
todo-list/
├── src/
│   └── index.ts
├── styles/
│   ├── input.css
│   └── output.css
├── index.html
├── package.json
├── package-lock.json
└── tsconfig.json
```

> ⚠️ `output.css` is generated automatically by Tailwind and should not be edited manually.

## 🎯 Purpose

This project was created as a practical exercise for learning **TypeScript fundamentals** and applying them to a browser-based project.

It demonstrates concepts including:

* 🔷 TypeScript interfaces and type annotations
* 🌐 DOM manipulation
* 🖱️ Event listeners
* 🔒 Closures
* 📦 Arrays and objects
* 🔗 Object references
* 🔎 Array methods such as `filter()`
* 💾 Browser `localStorage`
* 🏗️ Dynamic element creation
* 🎨 Tailwind CSS utilities
