# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.






# 📘 React State, `prev` in setState, and Where Todo Data Comes From

This document explains in detail:
- Where your todo data comes from in the React app
- What `useState` does
- Why and how we use the `prev` keyword when updating state
- Real code examples for clarity

---

## 📦 Where Is the Data Coming From?

In your React Todo App, the **source of data** is the `useState` hook:

```js
const [todos, setTodos] = useState([]);
🧠 What This Line Means:
Part	Meaning
todos	A state variable that holds your todo list (array of objects).
setTodos()	A function to update the value of todos.
useState([])	Initializes todos as an empty array when the app first loads.

✅ So whenever you add, delete, or update a todo — you're changing the todos state using setTodos().

🔄 Why Do We Use prev?
Sometimes you’ll see:

js
Copy code
setTodos((prev) => [...prev, newTodo]);
Instead of:

js
Copy code
setTodos([...todos, newTodo]);
🤔 So... what is prev?
prev (short for "previous") is the current value of the state when you update it.

React’s state updates are asynchronous – meaning updates happen in the background.

If you directly use todos, it might be outdated or stale, especially if multiple updates happen quickly.

Using (prev) => ensures you're always working with the latest state, no matter what.

✅ Real-Life Analogy
Think of todos like a whiteboard showing the task list.
But if someone else updates the board at the same time as you, you might write over their change.

Using prev is like saying:

"Hey React, give me the latest version of the whiteboard right before I write on it."

🧪 Detailed Code Examples
1. addTodo()
js
Copy code
const addTodo = (todo) => {
  setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
};
prev is the current list of todos.

Creates a new todo with a unique id.

Adds the new todo at the beginning of the list.

Example:
If prev = [{ id: 1, todo: "A" }], and new todo is { todo: "B" }
Then todos becomes:

js
Copy code
[
  { id: 1234567890, todo: "B" },
  { id: 1, todo: "A" }
]
2. deleteTodo()
js
Copy code
const deleteTodo = (id) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
};
Uses filter() to remove a todo by id.

Example:
If prev = [{ id: 1, todo: "A" }, { id: 2, todo: "B" }]
And you call deleteTodo(1), result is:

js
Copy code
[{ id: 2, todo: "B" }]
3. toggleComplete()
js
Copy code
const toggleComplete = (id) => {
  setTodos((prev) =>
    prev.map((prevTodo) =>
      prevTodo.id === id
        ? { ...prevTodo, completed: !prevTodo.completed }
        : prevTodo
    )
  );
};
Uses map() to loop through todos.

If it finds the todo with matching id, it flips its completed value.

Example:
js
Copy code
[
  { id: 1, todo: "A", completed: false }
]
Calling toggleComplete(1) changes it to:

js
Copy code
[
  { id: 1, todo: "A", completed: true }
]
4. updateTodo()
js
Copy code
const updateTodo = (id, updatedTodo) => {
  setTodos((prev) =>
    prev.map((prevTodo) =>
      prevTodo.id === id ? updatedTodo : prevTodo
    )
  );
};
Fully replaces the existing todo object with a new one.

Make sure the new object still includes id and completed.

Example:
Before:

js
Copy code
{ id: 2, todo: "Old Text", completed: false }
Call:

js
Copy code
updateTodo(2, { id: 2, todo: "New Text", completed: false });
After:

js
Copy code
{ id: 2, todo: "New Text", completed: false }
📂 Summary Table
Function	What It Does	Why prev Is Used
addTodo()	Adds a new todo to the list	So new todo is added to the latest list
deleteTodo()	Removes a todo by id	Ensures filtering uses the latest todos
toggleComplete()	Flips completed true/false for a todo	Updates only the matching todo
updateTodo()	Replaces a todo with a new one	Ensures latest todos are updated properly

🧠 Key Takeaways
prev gives you the most recent version of the state.

Always use (prev) => {} syntax when your new state depends on the previous one.

This prevents bugs and stale state in async React updates.