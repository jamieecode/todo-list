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
  compose(applyMiddleware(middleware))
);

middleware.run(rootSaga);

export default store;
