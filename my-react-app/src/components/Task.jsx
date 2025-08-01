import { useState } from 'react';
import Subtask from './Subtask.jsx';
import './Task.css';

function Task({ task, tasks, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editTime, setEditTime] = useState(task.time);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskInput, setSubtaskInput] = useState('');

  const toggleComplete = () => {
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const removeTask = () => {
    const updatedTasks = tasks.filter(t => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const startEditing = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const finishEditing = (e) => {
    e.preventDefault();
    if (editText.trim() === '' || editTime === '') {
      alert('Task and time cannot be empty!');
      return;
    }
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, text: editText, time: editTime } : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
  };

  const handleSubtaskSubmit = (e) => {
    e.preventDefault();
    if (subtaskInput.trim() === '') {
      alert('Subtask cannot be empty!');
      return;
    }
    const newSubtask = { id: Date.now(), text: subtaskInput, completed: false };
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, subtasks: [...t.subtasks, newSubtask] } : t
    );
    setTasks(updatedTasks);
    setSubtaskInput('');
  };

  return (
    <li className="taskItem">
      {isEditing ? (
        <form className="editForm" onSubmit={finishEditing}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="taskText editing"
            autoFocus
          />
          <input
            type="time"
            value={editTime}
            onChange={(e) => setEditTime(e.target.value)}
            className="taskTime editing"
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="taskContent" onClick={startEditing}>
          <span className={`taskText ${task.completed ? 'completed' : ''}`}>
            {task.text}
          </span>
          <span className={`taskTime ${task.completed ? 'completed' : ''}`}>
            {task.time ? new Date(`1970-01-01T${task.time}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''}
          </span>
        </div>
      )}
      <button className="completeBtn" onClick={toggleComplete}>
        ✅
      </button>
      <button className="sublistBtn" onClick={() => setShowSubtaskInput(!showSubtaskInput)}>
        {showSubtaskInput ? '➖' : '➕'}
      </button>
      <button className="removeBtn" onClick={removeTask}>
        ❌
      </button>
      <form className={`subtaskInput ${showSubtaskInput ? 'active' : ''}`} onSubmit={handleSubtaskSubmit}>
        <input
          type="text"
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          placeholder="Enter a subtask"
        />
        <button type="submit">Add</button>
      </form>
      <ul className={`subtaskList ${task.subtasks.length > 0 ? 'active' : ''}`}>
        {task.subtasks.map(subtask => (
          <Subtask
            key={subtask.id}
            subtask={subtask}
            taskId={task.id}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
      </ul>
    </li>
  );
}

export default Task;