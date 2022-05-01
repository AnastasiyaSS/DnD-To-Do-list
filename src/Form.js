import { React, useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

function Form(props) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      let uniqueId = nanoid();
      let newTodoItem = {
        id: uniqueId,
        todo: task,
        complete: false,
      };
      props.onFormSubmit(newTodoItem);
      setTask("");
    } else {
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Type a task"
        aria-label="fulltask"
      />
      <button type="submit" value="Submit">
        <i className="fa-solid fa-circle-plus fa-3x"></i>
      </button>
    </form>
  );
}

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Form;
