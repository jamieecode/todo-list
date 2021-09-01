import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  FETCH_ALL,
  FETCH_TODO_BY_ID,
} from "./actionTypes";
import ITodo, { INewTodo } from "../../types/ITodo";
import {
  AddTodoActionType,
  DeleteTodoActionType,
  EditTodoActionType,
  FetchAllActionType,
  FetchTodoByIdActionType,
} from "../../types/IActionTypes";

export function fetchAll(): FetchAllActionType {
  return {
    type: FETCH_ALL,
  };
}

export function fetchTodoById(id: ITodo["id"]): FetchTodoByIdActionType {
  return {
    type: FETCH_TODO_BY_ID,
    payload: id,
  };
}

export function addTodo(todo: INewTodo): AddTodoActionType {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function editTodo(todo: ITodo): EditTodoActionType {
  return {
    type: EDIT_TODO,
    payload: { ...todo },
  };
}

export function deleteTodo(id: ITodo["id"]): DeleteTodoActionType {
  return {
    type: DELETE_TODO,
    payload: id,
  };
}
