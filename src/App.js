import { React, useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import "./App.css";
import TaskList from "./TaskList";
import Form from "./Form";

function App() {

  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);

    if (
      result.destination.droppableId === "in-progress" &&
      result.source.droppableId === "todo"
    ) {
      fromTodoToInProgress(result);
    } else if (
      result.destination.droppableId === "todo" &&
      result.source.droppableId === "in-progress"
    ) {
      fromInProgressToTodo(result);
    } else if (
      result.destination.droppableId === "done" &&
      result.source.droppableId === "in-progress"
    ) {
      fromInProgressToDone(result);
    } else if (
      result.destination.droppableId === "in-progress" &&
      result.source.droppableId === "done"
    ) {
      fromDoneToInProgress(result);
    } else if (
      result.destination.droppableId === "todo" &&
      result.source.droppableId === "done"
    ) {
      fromDoneToTodo(result);
    } else if (
      result.destination.droppableId === "done" &&
      result.source.droppableId === "todo"
    ) {
      fromTodoToDone(result);
    }
  };

  const fromTodoToInProgress = (result) => {
    const from = [...todos];
    const to = [...inProgress];

    const [movingItem] = from.splice(result.source.index, 1);
    to.splice(result.destination.index, 0, movingItem);

    setTodos(from);
    setInProgress(to);
  };

  const fromInProgressToTodo = (result) => {
    const from = [...inProgress];
    const to = [...todos];

    const [movingItem] = from.splice(result.source.index, 1);
    to.splice(result.destination.index, 0, movingItem);

    setTodos(to);
    setInProgress(from);
  };

  const fromInProgressToDone = (result) => {
    const from = [...inProgress];
    const to = [...done];

    const [movingItem] = from.splice(result.source.index, 1);
    to.splice(result.destination.index, 0, movingItem);

    setInProgress(from);
    setDone(to);
  };

  const fromDoneToInProgress = (result) => {
    const from = [...done];
    const to = [...inProgress];

    const [movingItem] = from.splice(result.source.index, 1);
    to.splice(result.destination.index, 0, movingItem);

    setInProgress(to);
    setDone(from);
  };

  const fromDoneToTodo = (result) => {
    const from = [...done];
    const to = [...todos];

    const [movingItem] = from.splice(result.source.index, 1);
    to.splice(result.destination.index, 0, movingItem);

    setDone(from);
    setTodos(to);
  };

  const fromTodoToDone = (result) => {
    const from = [...todos];
    const to = [...done];

    const [movingItem] = from.splice(result.source.index, 1);
    to.splice(result.destination.index, 0, movingItem);

    setTodos(from);
    setDone(to);
  };



  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todo"));
    if (todos) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("in-progress"));
    if (todos) {
      setInProgress(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("in-progress", JSON.stringify(inProgress));
  }, [inProgress]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("done"));
    if (todos) {
      setDone(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(done));
  }, [done]);

  const onFormSubmit = (newItem) => setTodos([...todos, newItem]);



  return (
    <div className="App">
      <Form onFormSubmit={onFormSubmit} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div>
          <h2>Task List</h2>
          <TaskList
            key="todo"
            droppableId="todo"
            list={todos}
            onDeleteHook={setTodos}
          />
        </div>

        <div className="progress">
          <div>
            <h2>In progress</h2>
            <TaskList
              key="in-progress"
              droppableId="in-progress"
              list={inProgress}
              onDeleteHook={setInProgress}
            />
          </div>

          <div>
            <h2>Done</h2>
            <TaskList
              key="done"
              droppableId="done"
              list={done}
              onDeleteHook={setDone}
            />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
