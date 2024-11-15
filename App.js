import React, { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList'; 
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Belajar React', priority: 'High', status: 'To Do', message: '' },
    { id: 2, title: 'Baca Buku', priority: 'Low', status: 'Done', message: '' },
    { id: 3, title: 'Buat Aplikasi', priority: 'Medium', status: 'In Progress', message: '' },
  ]);

  const [archivedTasks, setArchivedTasks] = useState([]);
  const [isArchivedView, setIsArchivedView] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  const deleteTask = (id) => {
    if (!isArchivedView) {
      setTasks(tasks.filter(task => task.id !== id));
    } else {
      setArchivedTasks(archivedTasks.filter(task => task.id !== id));
    }
  };

  const archiveTask = (id) => {
    const taskToArchive = tasks.find(task => task.id === id);
    setArchivedTasks([...archivedTasks, taskToArchive]);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (updatedTask) => {
    if (tasks.some(task => task.id === updatedTask.id)) {
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    } else {
      setArchivedTasks(archivedTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">DAILY NOTE</h1>
      
      {/* Form untuk menambahkan tugas */}
      <AddTask addTask={addTask} />

      {/* Tab untuk memilih antara tugas aktif dan terarsip */}
      <div className="d-flex mb-4">
        <button
          className={`tab-button ${!isArchivedView ? 'active' : ''}`}
          onClick={() => setIsArchivedView(false)}
        >
          Active Activity
        </button>
        <button
          className={`tab-button ${isArchivedView ? 'active' : ''}`}
          onClick={() => setIsArchivedView(true)}
        >
          archived Activity
        </button>
      </div>

      {/* Daftar tugas yang difilter berdasarkan tab yang dipilih */}
      <TaskList
        tasks={isArchivedView ? archivedTasks : tasks}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
        editTask={editTask}
        archiveTask={archiveTask}
        isArchivedView={isArchivedView}
        statusFilter={statusFilter}  // kirimkan statusFilter sebagai prop
      />
    </div>
  );
}

export default App;
