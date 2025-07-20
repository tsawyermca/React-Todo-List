import { useState } from 'react';
import Subtask from './Subtask.jsx';
import './Task.css';

function Task({ task, tasks, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
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

  const finishEditing = () => {
    if (editText.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, text: editText } : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') finishEditing();
  };

  const toggleSubtaskInput = () => {
    setShowSubtaskInput(!showSubtaskInput);
  };

  const addSubtask = () => {
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

  const handleSubtaskKeyPress = (e) => {
    if (e.key === 'Enter') addSubtask();
  };

  return (
    <li className="taskItem">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={finishEditing}
          onKeyPress={handleKeyPress}
          className="taskText editing"
          autoFocus
        />
      ) : (
        <span
          className={`taskText ${task.completed ? 'completed' : ''}`}
          onClick={startEditing}
        >
          {task.text}
        </span>
      )}
      <button className="completeBtn" onClick={toggleComplete}>
        ✅
      </button>
      <button className="sublistBtn" onClick={toggleSubtaskInput}>
        {showSubtaskInput ? '➖' : '➕'}
      </button>
      <button className="removeBtn" onClick={removeTask}>
        ❌
      </button>
      <div className={`subtaskInput ${showSubtaskInput ? 'active' : ''}`}>
        <input
          type="text"
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          onKeyPress={handleSubtaskKeyPress}
          placeholder="Enter a subtask"
        />
        <button onClick={addSubtask}>Add</button>
      </div>
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