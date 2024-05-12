import { useState } from "react";

export default function App() {
  const [taskList, setTaskList] = useState([]);

  function addTask(task) {
    const newTask = {
      id: crypto.randomUUID(),
      description: task,
      isEditing: false,
      isCompleted: false,
    };
    setTaskList((prevList) => [...prevList, newTask]);
  }

  function handleDeleteTask(task) {
    setTaskList((prevList) =>
      prevList.filter((prevTask) => prevTask.id !== task.id)
    );
  }

  function handleCompleteTask(id) {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  function handleEditTask(id) {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  }

  function handleTaskEdited(task, id) {
    setTaskList((prevList) =>
      prevList.map((prevTask) =>
        prevTask.id === id
          ? { ...prevTask, description: task, isEditing: false }
          : prevTask
      )
    );
  }

  return (
    <div className="container">
      <Header />
      <InputTaskForm onAddTask={addTask} />
      <TaskList
        tasks={taskList}
        onDeleteTask={handleDeleteTask}
        onCompleteTask={handleCompleteTask}
        onEditTask={handleEditTask}
        onTaskEdited={handleTaskEdited}
      />
    </div>
  );
}

function Header() {
  return <h2>Get Things Done!</h2>;
}

function InputTaskForm({ onAddTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    onAddTask(task);
    setTask("");
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-form__container">
        <input
          value={task}
          type="text"
          placeholder="What is the task today?"
          onChange={(e) => setTask(e.target.value)}
        />
        <button>Add Task</button>
      </div>
    </form>
  );
}

function EditTaskForm({ editTask, etask }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    editTask(task, etask.id);
    setTask("");
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-form__container">
        <input
          value={task}
          type="text"
          placeholder="Update task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button>Update Task</button>
      </div>
    </form>
  );
}

function TaskList({
  tasks,
  onDeleteTask,
  onCompleteTask,
  onEditTask,
  onTaskEdited,
}) {
  return (
    <ul className="task__list">
      {tasks.map((task) =>
        task.isEditing ? (
          <EditTaskForm key={task.id} editTask={onTaskEdited} etask={task} />
        ) : (
          <ListItem
            task={task}
            key={task.id}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
            onEditTask={onEditTask}
          />
        )
      )}
    </ul>
  );
}

function ListItem({ task, onDeleteTask, onCompleteTask, onEditTask }) {
  return (
    <li className="task__list--item">
      <span
        onClick={() => onCompleteTask(task.id)}
        className={task.isCompleted ? "completed" : ""}
      >
        {task.description}
      </span>
      <button className="button" onClick={() => onDeleteTask(task)}>
        Delete
      </button>
      <button className="button" onClick={() => onEditTask(task.id)}>
        Edit
      </button>
    </li>
  );
}
