import './PastLists.css';

function PastLists({ pastLists }) {
  return (
    <div className="pastLists">
      <h3>Past Lists</h3>
      <div className="pastListsContainer">
        {pastLists.map((pastList, index) => (
          <div key={index} className="pastList">
            <h4>{new Date(pastList.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</h4>
            <ul>
              {pastList.tasks.map(task => (
                <li key={task.id}>
                  <div className="taskContent">
                    <span className={`taskText ${task.completed ? 'completed' : ''}`}>
                      {task.text}
                    </span>
                    <span className={`taskTime ${task.completed ? 'completed' : ''}`}>
                      {task.time ? new Date(`1970-01-01T${task.time}:00`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''}
                    </span>
                  </div>
                  {task.subtasks.length > 0 && (
                    <ul className="subtaskList active">
                      {task.subtasks.map(subtask => (
                        <li key={subtask.id}>
                          <span className={`subtaskText ${subtask.completed ? 'completed' : ''}`}>
                            {subtask.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastLists;