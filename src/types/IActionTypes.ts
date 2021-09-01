import ITodo, { INewTodo } from "./ITodo";
import {
  ADD_TODO,
  ADD_TODO_ASYNC,
  DELETE_TODO,
  DELETE_TODO_ASYNC,
  EDIT_TODO,
  EDIT_TODO_ASYNC,
  FETCH_ALL,
  FETCH_ALL_ASYNC,
  FETCH_TODO_BY_ID,
  FETCH_TODO_BY_ID_ASYNC,
} from "../redux/actions/actionTypes";

export interface FetchAllActionType {
  type: typeof FETCH_ALL | typeof FETCH_ALL_ASYNC;
  payload?: ITodo[];
}

export interface FetchTodoByIdActionType {
  type: typeof FETCH_TODO_BY_ID;
  payload: ITodo["id"];
}

export interface FetchTodoByIdAsyncActionType {
  type: typeof FETCH_TODO_BY_ID_ASYNC;
  payload: ITodo;
}

export interface AddTodoActionType {
  type: typeof ADD_TODO;
  payload: INewTodo;
}

export interface AddTodoAsyncActionType {
  type: typeof ADD_TODO_ASYNC;
  payload: ITodo;
}

export interface EditTodoActionType {
  type: typeof EDIT_TODO | typeof EDIT_TODO_ASYNC;
  payload: ITodo;
}

export interface DeleteTodoActionType {
  type: typeof DELETE_TODO;
  payload: ITodo["id"];
}

export interface DeleteTodoAsyncActionType {
  type: typeof DELETE_TODO_ASYNC;
  payload: ITodo;
}
