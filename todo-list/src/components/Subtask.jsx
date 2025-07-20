import './Subtask.css';

function Subtask({ subtask, taskId, tasks, setTasks }) {
  const toggleSubtaskComplete = () => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId
        ? {
            ...t,
            subtasks: t.subtasks.map(s =>
              s.id === subtask.id ? { ...s, completed: !s.completed } : s
            ),
          }
        : t
    );
    setTasks(updatedTasks);
  };

  const removeSubtask = () => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId
        ? { ...t, subtasks: t.subtasks.filter(s => s.id !== subtask.id) }
        : t
    );
    setTasks(updatedTasks);
  };

  return (
    <li className="subtaskItem">
      <span className={`subtaskText ${subtask.completed ? 'completed' : ''}`}>
        {subtask.text}
      </span>
      <button className="completeBtn" onClick={toggleSubtaskComplete}>
        ✅
      </button>
      <button className="removeBtn" onClick={removeSubtask}>
        ❌
      </button>
    </li>
  );
}

export default Subtask;