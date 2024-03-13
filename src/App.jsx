import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('not completed');
  const [filter, setFilter] = useState('all');

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const addTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      taskName,
      description,
      status
    };
    setTodos([...todos, newTodo]);
    setTaskName('');
    setDescription('');
    setStatus('not completed');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <select value={status} onChange={handleStatusChange}>
          <option value="not completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="todo-card">
            <h3>Name:{todo.taskName}</h3>
            <p>Description:{todo.description}</p>
            <p>Status: {todo.status}</p>
            <div className="todo-actions">
              <button  onClick={() => updateStatus(todo.id, todo.status === 'completed' ? 'not completed' : 'completed')}>
                Change Status
              </button>
              <button  onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
