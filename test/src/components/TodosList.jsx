import React from "react";

const TodosList = ({ data }) => {
  return (
    <>
      <ul>
        {data.map((todo) => {
          <li key={todo.id}>
            <p>{todo.title}</p>
          </li>;
        })}
      </ul>
    </>
  );
};

export default TodosList;
