import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers/reducers";
import rootSaga from "../saga/saga";
import ITodoState from "../../types/ITodoState";

const middleware = createSagaMiddleware();

const defaultState: ITodoState = { todos: [] };

const currentState = defaultState;

const store = createStore(
  rootReducer,
  currentState,
  compose(
    applyMiddleware(middleware),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

middleware.run(rootSaga);

export default store;
