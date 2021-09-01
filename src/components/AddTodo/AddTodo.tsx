import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addTodo } from "../../redux/actions/actions";
import { INewTodo } from "../../types/ITodo";
import { formatDate } from "../../utils/formatDate";
import styled from "styled-components";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

const AddTodoForm = styled.form`
  display: flex;
  width: 40%;
  // min-width: 20rem;
  flex-direction: column;
  border-radius: 0.5em;
  background-color: #eaeefb;
  padding: 1em;
  label {
    font-weight: bold;
    padding: 0.3em;
  }

  input {
    padding: 0.5em;
  }

  button {
    padding: 0.7em 0;
    background-color: #1b274e;
    color: #fff;
    margin-top: 1em;
    font-weight: bold;
  }
`;

const AddTodo = () => {
  const classes = useStyles();
  const [date, setDate] = useState<Date>(new Date());
  const today = formatDate(date);
  const handleChange = (e: any) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<INewTodo>();
  const onSubmit = (data: INewTodo, e: any) => {
    const newTodo = {
      title: data.title,
      text: data.text,
      endDate: data.endDate,
    };
    dispatch(addTodo(newTodo));
    console.log(newTodo);
    e.target.reset();
  };

  return (
    <AddTodoForm onSubmit={handleSubmit(onSubmit)} defaultValue="">
      <TextField
        {...register("endDate")}
        id="date"
        label="마감일"
        type="endDate"
        defaultValue={today}
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <label htmlFor="title">할일</label>
      <input type="text" {...register("title")} />

      <label htmlFor="text">세부사항</label>
      <input type="text" {...register("text")} />

      <button type="submit">추가</button>
    </AddTodoForm>
  );
};

export default AddTodo;
