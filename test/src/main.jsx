import React from "react";
import todos from "./data/todos.data.json";
import posts from "./data/posts.data.json";
import TodosList from "./components/TodosList";
import ReactDOM, { hydrateRoot } from "react-dom/client";

console.log("start main");
console.log("todos:", todos);
console.log("posts:", posts);

const ENVS = { DEV: "development", PROD: "production" };

const injectInHtml = (domEl, component, isStatic = true) => {
  if (process?.env?.NODE_ENV === ENVS.PROD && isStatic) {
    console.log(`Hydrating root ${domEl.id}...`);
    hydrateRoot(domEl, component);
  } else {
    console.log(`Creating root ${domEl.id}...`);
    ReactDOM.createRoot(domEl).render(component);
  }
};

const get = (id) => document.getElementById(id);

const main = () => {
  console.log("Environnement:", process?.env?.NODE_ENV);

  const todosList = get("todosList");
  if (todosList) injectInHtml(todosList, <TodosList data={todos} />);
};

window.addEventListener("load", main);
