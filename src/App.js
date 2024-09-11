import React, { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import styles from "./App.module.css";
function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const saveTodos = JSON.parse(localStorage.getItem("todo")) || [];
    setTodoList(saveTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]); //todoList가 바뀔때 마다 실행

  const onInput = (event) => {
    setTodo(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setTodo("");
    if (todo === "") {
      return;
    }
    setTodoList((currentText) => [todo, ...currentText]);
  };

  const onDelete = (index) => {
    setTodoList(todoList.filter((_, todoIndex) => index !== todoIndex));
  };
  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <div className={styles.todoListBox}>
        <ul>
          {todoList.map((text, index) => (
            <li key={index}>
              <span>{text}</span>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(index)}
              >
                <FaTrashCan />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={onSubmit}>
        <input
          onInput={onInput}
          value={todo}
          type="text"
          placeholder="텍스트를 작성해 주세요..😍"
        ></input>
        <button className={styles.submitBtn} type="submit">
          입력
        </button>
      </form>
    </div>
  );
}

export default App;
