// import React, { useState } from 'react';
// import './TodoList.css';
// import Success from '../Success/Success';

// const TodoList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [task, setTask] = useState('');

//   const handleInputChange = (e) => {
//     setTask(e.target.value);
//   };

//   const handleAddTask = () => {
//     if (task.trim()) {
//       setTasks([...tasks, task]);
//       setTask('');
//     }
//   };

//   const handleRemoveTask = (index) => {
//     const newTasks = tasks.filter((_, i) => i !== index);
//     setTasks(newTasks);
//   };

//   return (
//     // TODO: Add functionality to mark tasks as completed and display a count of completed tasks
//     // TODO: Add functionality to edit tasks
//     // TODO: Add functionality to filter tasks by completed or incomplete
//     // TODO: Add functionality to sort tasks alphabetically or by due date
//     // TODO: Add functionality to display tasks in different colors based on priority (e.g., high, medium, low)
//     // TODO: Add functionality to share tasks with other users
//     // TODO: Add functionality to add reminders for tasks
//     // TODO: Add functionality to set due dates for tasks
//     // TODO: Add functionality to prioritize tasks based on importance (e.g., urgent, important, not important)
//     // TODO: Add functionality to attach files to tasks
//     // TODO: Add functionality to create and manage task categories
//     // TODO: Add functionality to assign tasks to specific team members
//     // TODO: Add functionality to collaborate with other team members on tasks
//     // TODO: Add functionality to export tasks as a CSV file
//     // TODO: Add functionality to import tasks from a CSV
//     // TODO: Add functionality to filter tasks based on task categories
//     // TODO: Add functionality to filter tasks based on due dates
//     // TODO: Add functionality to filter tasks based on priority
//     // TODO: Add functionality to filter tasks based on assigned team members
//     // TODO: Add functionality to filter tasks based on collaborators
//     // TODO: Add functionality to sort tasks alphabetically or by due date
//     // TODO: Add functionality to display tasks in different colors based on priority (e.g., high, medium, low)
//     // TODO: Add functionality to share tasks with other users
//     // TODO: Add functionality to add reminders for tasks
//     // TODO: Add functionality to set due dates for tasks
//     // TODO: Add functionality to prioritize tasks based on importance (e.g., urgent, important, not important)
//     // TODO: Add functionality to attach files to tasks
//     // TODO: Add functionality to create and manage task categories
//     // TODO: Add functionality to assign tasks to

//     <div className="todo-list">
//       <Success/>
//       <h1>To-Do List</h1>
//       <div className="input-container">
//         <input
//           type="text"
//           value={task}
//           onChange={handleInputChange}
//           placeholder="Add a new task"
//         />
//         <button onClick={handleAddTask}>Add</button>
//       </div>
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}>
//             {task} <button onClick={() => handleRemoveTask(index)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;


import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = { text: task, completed: false, id: Date.now(), dueDate: dueDate };
      setTasks([...tasks, newTask]);
      setTask('');
      setDueDate('');

      if (tasks.length + 1 === 5) {
        setShowSignupPrompt(true);
      }
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'alphabetical') return a.text.localeCompare(b.text);
    if (sort === 'due-date') return new Date(a.dueDate) - new Date(b.dueDate);
    return 0;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Add a new task"
          disabled={showSignupPrompt}
        />
        <input
          type="date"
          value={dueDate}
          onChange={handleDueDateChange}
          disabled={showSignupPrompt}
        />
        <button onClick={handleAddTask} disabled={showSignupPrompt}>Add</button>
      </div>
      <div className="controls">
        <select value={filter} onChange={handleFilterChange} disabled={showSignupPrompt}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <select value={sort} onChange={handleSortChange} disabled={showSignupPrompt}>
          <option value="default">Default</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="due-date">Due Date</option>
        </select>
      </div>
      <p>Completed Tasks: {completedCount}</p>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
              disabled={showSignupPrompt}
            />
            <span
              contentEditable={!showSignupPrompt}
              suppressContentEditableWarning
              onBlur={(e) => handleEditTask(task.id, e.target.textContent)}
            >
              {task.text}
            </span>
            <span className="due-date">{task.dueDate}</span>
            <button onClick={() => handleRemoveTask(task.id)} disabled={showSignupPrompt}>Remove</button>
          </li>
        ))}
      </ul>

      {showSignupPrompt && (
        <div className="signup-prompt">
          <div className="signup-prompt-content">
            <h2>Create an Account</h2>
            <p>You have added 5 tasks. Please create an account to continue.</p>
            <button onClick={() => alert('Redirecting to signup page...')}>Sign Up</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
