import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import AddTodo from "./components/AddTodo/AddTodo";
import ITodoState from "./types/ITodoState";
import TodoList from "./components/TodoList/TodoList";
import { fetchAll } from "./redux/actions/actions";
import styled from "styled-components";

const Section = styled.section`
  width: 75%;

  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: #4e50b7;
  padding: 2em;
  border-radius: 0.5em;
`;

const App = () => {
  const dispatch = useDispatch();
  const todosInState: ITodoState = {
    todos: useSelector((state: ITodoState) => state.todos),
  };
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Section>
        <AddTodo />

        <TodoList {...todosInState} />
      </Section>
    </>
  );
};

export default App;
