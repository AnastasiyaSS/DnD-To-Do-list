import React from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";

function TaskList(props) {
  const handleDelete = (idx) => {
    props.onDeleteHook(props.list.filter((it) => it.id !== idx));
  };

  return (
    <Droppable droppableId={props.droppableId}>
      {(provided) => (
        <ul
          className={props.droppableId}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {props.list.map((task, index) => {
            const { id, todo } = task;
            return (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {todo}
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => handleDelete(id)}
                    ></i>
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

TaskList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onDeleteHook: PropTypes.func.isRequired,
};

export default TaskList;
