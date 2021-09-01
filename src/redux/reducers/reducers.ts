import {
  AddTodoAsyncActionType,
  DeleteTodoAsyncActionType,
  EditTodoActionType,
  FetchAllActionType,
  FetchTodoByIdActionType,
  FetchTodoByIdAsyncActionType,
} from "../../types/IActionTypes";
import ITodoState from "../../types/ITodoState";

const initialState: ITodoState = {
  todos: [],
};

type ActionType =
  | FetchAllActionType
  | AddTodoAsyncActionType
  | FetchTodoByIdAsyncActionType
  | FetchTodoByIdActionType
  | EditTodoActionType
  | DeleteTodoAsyncActionType;

const rootReducer = (state = initialState, action: ActionType): ITodoState => {
  switch (action.type) {
    case "FETCH_ALL_ASYNC":
      if (action.payload) {
        return { todos: action.payload };
      }
      return { todos: [] };

    case "ADD_TODO_ASYNC":
      if (state.todos) {
        return { todos: [...state.todos, action.payload] };
      }
      return { todos: [action.payload] };

    case "FETCH_TODO_BY_ID":
      return { todos: state.todos }; // clear task
    case "FETCH_TODO_BY_ID_ASYNC":
      if (state.todos) {
        return { ...state, todo: action.payload };
      }
      return { ...state };

    case "EDIT_TODO_ASYNC":
      if (state.todos) {
        const todos = state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.text = action.payload.text;
          }
          return todo;
        });
        return { todos: [...todos] };
      }
      return { ...state };

    case "DELETE_TODO_ASYNC":
      if (state.todos) {
        const todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        return { todos: [...todos] };
      }
      return { ...state };

    default:
      return state;
  }
};

export default rootReducer;
