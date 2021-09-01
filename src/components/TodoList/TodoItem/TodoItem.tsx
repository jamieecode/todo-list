import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ITodo from "../../../types/ITodo";
import ITodoState from "../../../types/ITodoState";
import { editTodo } from "../../../redux/actions/actions";
import { deleteTodo, fetchTodoById } from "../../../redux/actions/actions";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";

export const Todo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  padding: 1em;
  border-radius: 0.5em;

  margin-bottom: 1em;
  div {
    display: flex;
    justify-content: space-between;
  }

  button {
    margin: 0 0.25em;
    padding: 0.3em 0.5em;
  }
  button:first-of-type {
    background-color: #007f5f;
  }
  button:last-of-type {
    background-color: #e63946;
  }
  small {
    margin-top: 0.3em;
  }
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid black;
  width: 100%;
`;

export const Button = styled.button`
  padding: 0.5em;
  background-color: #1b274e;
  display: block;
  margin-top: 0.5em;
  width: 100%;
`;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0.5em",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TodoItem = (todo: ITodo) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<ITodo>();
  const todoSelector = useSelector((state: ITodoState) => state.todo);
  const { data } = { data: todoSelector };
  const onSubmit: SubmitHandler<ITodo> = (data) => {
    data.id = todoSelector?.id as ITodo["id"];
    data.createdAt = todoSelector?.createdAt as ITodo["createdAt"];
    data.endDate = todoSelector?.endDate as ITodo["endDate"];
    dispatch(editTodo(data));
    handleClose();
  };

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Todo>
      <div>
        <h3>{todo.title}</h3>
        <div>
          <button
            onClick={() => {
              dispatch(fetchTodoById(todo.id));
              handleOpen();
            }}
          >
            <CreateOutlinedIcon />
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={modalStyle} className={classes.paper}>
                <h3 id="simple-modal-title">수정하기</h3>
                <Input
                  type="text"
                  {...register("title")}
                  defaultValue={todo?.title}
                />
                <p id="simple-modal-description"></p>
                <Input
                  type="text"
                  {...register("text")}
                  defaultValue={todo?.text}
                />
                <Button type="submit" value="Submit">
                  완료
                </Button>
              </div>
            </form>
          </Modal>

          <button
            onClick={() => {
              dispatch(deleteTodo(todo.id));
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </button>
        </div>
      </div>
      <div>
        <small>{todo.text}</small>

        <small>
          {todo.createdAt} {todo.endDate}
        </small>
      </div>
    </Todo>
  );
};

export default TodoItem;
