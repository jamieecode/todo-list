import React from "react";
import ITodoState from "../../types/ITodoState";
import ITodo from "../../types/ITodo";
import TodoItem from "./TodoItem/TodoItem";

const TodoList = (todosInState: ITodoState) => {
  const todos = (todosInState.todos || []).map((todo: ITodo) => (
    <TodoItem {...todo} key={todo.id} />
  ));
  return <section style={{ width: "55%" }}>{todos}</section>;
};

export default TodoList;
