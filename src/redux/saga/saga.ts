import { put, takeEvery } from "redux-saga/effects";
import { formatDate } from "../../utils/formatDate";
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
} from "../actions/actionTypes";
import {
  AddTodoActionType,
  DeleteTodoActionType,
  EditTodoActionType,
  FetchTodoByIdActionType,
} from "../../types/IActionTypes";
import ITodo, { INewTodo } from "../../types/ITodo";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

// imitate server call
async function fakeFetch(response: any, ms = 300) {
  return new Promise((resolve) => {
    console.log("res", resolve);
    setTimeout(() => {
      resolve(response);
    }, ms);
  });
}

const storeKey = "todos";
const getPersistedState = () => {
  const persistedState = localStorage.getItem(storeKey);
  return persistedState ? (JSON.parse(persistedState) as ITodo[]) : [];
};
const saveState = (todos: ITodo[]): void => {
  localStorage.setItem(storeKey, JSON.stringify(todos));
};

const addTodo = (newTodo: INewTodo): ITodo => {
  const persistedState = getPersistedState();
  const currentId = persistedState.length
    ? Math.max(...persistedState.map((todo) => todo.id || 0))
    : 0;
  const todo = {
    ...newTodo,
    id: currentId + 1,
    createdAt: formatDate(new Date()),
  };
  persistedState.push(todo);
  saveState(persistedState);
  return todo;
};

const getTodoById = (id: ITodo["id"]): ITodo => {
  const persistedState = getPersistedState();
  const currentTodo = persistedState.find((todo) => todo.id === id) as ITodo;
  return currentTodo;
};

const editTodo = (editedTodo: ITodo): ITodo => {
  const persistedState = getPersistedState();
  const updatedState = persistedState.map((todo) => {
    if (todo.id === editedTodo.id) {
      todo.title = editedTodo.title;
      todo.text = editedTodo.text;
    }
    return todo;
  });
  saveState(updatedState);
  return editedTodo;
};

const deleteTodo = (id: ITodo["id"]): ITodo | null => {
  const persistedState = getPersistedState();
  const removedTodo = persistedState.find((todo) => todo.id === id) || null;
  const todos = persistedState.filter((todo) => todo.id !== id);
  saveState(todos);
  return removedTodo;
};

export function* fetchAllAsync() {
  const state = getPersistedState();
  const response: ResponseGenerator = yield fakeFetch(state);

  console.log(response.data);
  yield put({ type: FETCH_ALL_ASYNC, payload: response });
}

export function* addTodoAsync(action: AddTodoActionType) {
  const todo = addTodo(action.payload);
  // we can also return full list of tasks
  // yield fetchAllAsync();

  const response: ResponseGenerator = yield fakeFetch(todo);
  console.log(response.data);
  yield put({ type: ADD_TODO_ASYNC, payload: response });
}

export function* editTodoAsync(action: EditTodoActionType) {
  const editedTodo = editTodo(action.payload);
  // we can also return full list of tasks
  // yield fetchAllAsync();

  const response: ResponseGenerator = yield fakeFetch(editedTodo);
  console.log(response.data);
  yield put({ type: EDIT_TODO_ASYNC, payload: response });
}

export function* fetchTodoByIdAsync(action: FetchTodoByIdActionType) {
  const todo = getTodoById(action.payload);
  const response: ResponseGenerator = yield fakeFetch(todo);
  console.log(response.data);
  yield put({ type: FETCH_TODO_BY_ID_ASYNC, payload: response });
}

export function* deleteTodoAsync(action: DeleteTodoActionType) {
  const removedTodo = deleteTodo(action.payload);
  // we can also return full list of tasks
  // yield fetchAllAsync();

  const response: ResponseGenerator = yield fakeFetch(removedTodo);
  console.log(response.data);
  yield put({ type: DELETE_TODO_ASYNC, payload: response });
}

export default function* rootSaga() {
  yield takeEvery(FETCH_ALL, fetchAllAsync);
  yield takeEvery(FETCH_TODO_BY_ID, fetchTodoByIdAsync);
  yield takeEvery(ADD_TODO, addTodoAsync);
  yield takeEvery(EDIT_TODO, editTodoAsync);
  yield takeEvery(DELETE_TODO, deleteTodoAsync);
}
