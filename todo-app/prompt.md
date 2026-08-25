# Step-by-Step AI Prompts for Building a Todo App

## Step 1: Set Up the Basic App

**Prompt:**

Build a clean and responsive Todo App using HTML, CSS, and JavaScript.

For now, create only the basic UI structure. The page should include:

* A clear heading such as "My Todo List"
* A text input where users can enter a task
* An "Add Task" button
* A section where todo tasks will be displayed
* Filter buttons for:

  * All
  * Active
  * Completed

Requirements:

* Use semantic and clean HTML.
* Keep HTML, CSS, and JavaScript in separate files.
* Make the layout responsive for desktop and mobile.
* Use a modern, minimal, and user-friendly design.
* Do not implement functionality yet.
* Add comments explaining the purpose of important sections.

After generating the code, explain the project structure and how to run it in the browser.

---

## Step 2: Implement Adding Tasks

**Prompt:**

Now implement the functionality for adding tasks to the Todo App.

Requirements:

* When the user enters task text and clicks the "Add Task" button, the task should immediately appear in the todo list.
* Pressing the Enter key should also add the task.
* Do not allow empty or whitespace-only tasks.
* Clear the input field after successfully adding a task.
* Each task should have:

  * A checkbox for completion status
  * The task text
  * An Edit button or icon
  * A Delete button or icon
* Store each task as an object with properties such as:

  ```javascript
  {
    id: uniqueId,
    text: "Buy groceries",
    completed: false
  }
  ```
* Maintain all tasks inside a JavaScript array.
* Update the UI dynamically without reloading the page.

Explain the logic for adding a task step by step.

---

## Step 3: Implement Task Completion

**Prompt:**

Now add task status functionality.

Requirements:

* Clicking the checkbox should toggle a task between Active and Completed.
* Completed tasks should have a clear visual difference, such as:

  * Strikethrough text
  * Reduced opacity or another subtle style
* Clicking the checkbox again should mark the task as active.
* Update the `completed` property of the corresponding task object.
* Keep the JavaScript array and UI synchronized.

Explain how the task ID is used to identify and update the correct task.

---

## Step 4: Implement Inline Editing

**Prompt:**

Now implement inline editing for tasks.

Requirements:

* Clicking the Edit button should allow the user to edit the task directly in the todo list.
* Replace the task text with an input field when editing.
* Allow the user to:

  * Save the edited task
  * Cancel editing
* Pressing Enter should save the changes.
* Do not allow the edited task to become empty.
* The task should update in the existing position without creating a new task.
* Only one task should be edited at a time.

Keep the implementation simple and beginner-friendly.

Explain how the application switches between normal mode and edit mode.

---

## Step 5: Implement Task Deletion

**Prompt:**

Now implement the delete functionality.

Requirements:

* Clicking the Delete button should remove the correct task.
* Show a confirmation dialog before permanently deleting a task.
* Remove the task from the JavaScript array.
* Update the UI immediately.
* Make sure deleting one task does not affect other tasks.

Use a clean and simple approach such as filtering the tasks array using the task ID.

Explain how the array is updated after deletion.

---

## Step 6: Implement Filtering

**Prompt:**

Now implement task filtering.

The application should support three filters:

1. All — Show every task.
2. Active — Show only tasks where `completed` is false.
3. Completed — Show only tasks where `completed` is true.

Requirements:

* The currently selected filter should be visually highlighted.
* Switching filters should update the displayed tasks immediately.
* Adding, editing, completing, or deleting tasks should work correctly while any filter is active.
* Keep track of the current filter using a variable.

Use clean JavaScript and explain the filtering logic step by step.

---

## Step 7: Add Local Storage

**Prompt:**

Now add local storage so tasks persist after refreshing or reopening the browser.

Requirements:

* Save the tasks array to local storage whenever:

  * A task is added
  * A task is edited
  * A task is deleted
  * A task status changes
* When the application loads, retrieve existing tasks from local storage.
* If no saved tasks exist, start with an empty array.
* Use `JSON.stringify()` when saving tasks.
* Use `JSON.parse()` when retrieving tasks.
* Handle possible errors safely.

Create reusable functions such as:

```javascript
saveTasks()
loadTasks()
```

Explain clearly how local storage works in this application.

---

## Step 8: Add Empty States and Better UX

**Prompt:**

Improve the user experience of the Todo App.

Add:

* A friendly empty state when there are no tasks.
* Different messages depending on the selected filter, for example:

  * "No tasks yet. Add your first task!"
  * "No active tasks."
  * "No completed tasks."
* Clear visual feedback when buttons are clicked.
* Focus the input field after adding a task.
* Add appropriate `aria-label` attributes for icon-only buttons.
* Make sure keyboard users can use the application.
* Ensure buttons and inputs are easy to use on mobile devices.

Keep the interface minimal and avoid unnecessary features.

---

## Step 9: Improve the Design and Responsiveness

**Prompt:**

Now improve the CSS and overall visual design of the Todo App.

Requirements:

* Modern and clean appearance.
* Responsive design for:

  * Desktop
  * Tablet
  * Mobile
* Center the main todo container.
* Use proper spacing and typography.
* Make filter buttons visually clear.
* Add hover and focus states.
* Make completed tasks visually distinct.
* Ensure long task text wraps properly without breaking the layout.
* Make action buttons easy to click on small screens.
* Use subtle transitions, but avoid excessive animations.

Do not change the existing JavaScript functionality.

---

## Step 10: Refactor the Final Code

**Prompt:**

Review the complete Todo App code and refactor it without changing its functionality.

Check for:

* Duplicate code
* Unused variables or functions
* Poor variable names
* Repeated DOM queries
* Possible bugs
* Edge cases
* Local storage issues
* Filtering issues
* Editing issues

Organize the JavaScript into clear functions such as:

```javascript
addTask()
renderTasks()
toggleTask()
editTask()
deleteTask()
filterTasks()
saveTasks()
loadTasks()
```

Use clear variable names and comments only where they improve understanding.

After refactoring:

1. Provide the final `index.html`.
2. Provide the final `style.css`.
3. Provide the final `script.js`.
4. Explain how the application works.
5. List the main features implemented.
6. Suggest a few optional future improvements, but do not implement them.

---

## Step 11: Migrate to Full-Stack Architecture

**Prompt:**

Please migrate our vanilla JavaScript Todo app into a modern Full-Stack application.

Requirements:
* Set up a Node.js/Express backend with an SQLite database for persistence.
* Create a React frontend using Vite and TypeScript.
* Ensure all existing CRUD features (add, edit, complete, delete, filter) are fully supported via REST API endpoints.
* Keep the frontend and backend in a monorepo structure for easy development.
* Ensure offline caching is implemented on the frontend in case the API goes down.

---

## Step 12: Apply Modern SaaS Styling

**Prompt:**

Refactor the UI to utilize a clean, modern Indigo productivity theme typical of SaaS applications.

Requirements:
* Apply the following color palette: Background (#F8FAFC), Surface (#FFFFFF), Primary (#4F46E5).
* Ensure the styling focuses solely on CSS improvements without altering backend logic.
* Update task items, filter pills, and header typography to appear polished and professional.

---

## Step 13: UI Refinements and Layout Adjustments

**Prompt:**

Revert the main view back to a side-by-side dashboard layout while retaining the new Indigo theme.

Requirements:
* Introduce category-based highlighting for tasks: use orange accents for active tasks and green for completed tasks.
* Implement a subtle custom cursor highlight for an engaging user experience.
* Slightly reduce the overall UI scale for better data density.
* Ensure left borders are clearly visible on task items to separate the categories.

---

## Step 14: Security Hardening and Best Practices

**Prompt:**

We need to harden the application's security to production standards. Please implement the following:

Requirements:
* Strict input validation on the backend (string length limits, data types, strict UUID format).
* API abuse prevention using `express-rate-limit` and payload size limits on JSON bodies.
* HTTP security headers using `helmet` and strict CORS policies limited to the frontend.
* Ensure no secrets or database files are committed to version control by adding a comprehensive `.gitignore`.
* Verify protections against SQL Injection (using parameterized queries) and XSS (using React).
* Add comprehensive automated tests in Jest/Supertest to mathematically prove these security measures function correctly.
