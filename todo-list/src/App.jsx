import { useState, useEffect } from 'react';
import Task from './components/Task.jsx';
import PastLists from './components/PastLists.jsx';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [pastLists, setPastLists] = useState([]);
  const [showPastLists, setShowPastLists] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastDate');
    if (lastDate && lastDate !== today && tasks.length > 0) {
      setPastLists(prev => {
        const newPastLists = [...prev, { date: lastDate, tasks }];
        localStorage.setItem('pastTasks', JSON.stringify(newPastLists));
        return newPastLists;
      });
      setTasks([]);
      localStorage.setItem('tasks', '[]');
    }
    localStorage.setItem('lastDate', today);

    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
    const savedPastLists = JSON.parse(localStorage.getItem('pastTasks') || '[]');
    setPastLists(savedPastLists.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const addTask = () => {
    if (taskInput.trim() === '') {
      alert('Please enter a task!');
      return;
    }
    const newTask = { id: Date.now(), text: taskInput, completed: false, subtasks: [] };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTaskInput('');
    setFilter('all');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', dateOptions);

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <p className="currentDate">{today}</p>
      <div className="textInput">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filterTasks">
        <button
          className={`filterBtn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tasks
        </button>
        <button
          className={`filterBtn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed Tasks
        </button>
        <button
          className={`filterBtn ${filter === 'incomplete' ? 'active' : ''}`}
          onClick={() => setFilter('incomplete')}
        >
          Incomplete Tasks
        </button>
      </div>
      <ul className="taskList">
        {tasks
          .filter(task => {
            const hasIncompleteSubtasks = task.subtasks.some(sub => !sub.completed);
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed && !hasIncompleteSubtasks;
            if (filter === 'incomplete') return !task.completed || hasIncompleteSubtasks;
            return true;
          })
          .map(task => (
            <Task key={task.id} task={task} tasks={tasks} setTasks={saveTasks} />
          ))}
      </ul>
      <button className="togglePastLists" onClick={() => setShowPastLists(!showPastLists)}>
        {showPastLists ? 'Hide Past Lists' : 'Show Past Lists'}
      </button>
      {showPastLists && <PastLists pastLists={pastLists} />}
    </div>
  );
}

export default App;