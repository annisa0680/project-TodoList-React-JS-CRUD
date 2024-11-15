import React from 'react';
import { FaTrash, FaEdit, FaArchive } from 'react-icons/fa';
import Swal from 'sweetalert2';



function TaskItem({ task, updateTaskStatus, deleteTask, editTask, archiveTask, isArchivedView }) {
  const priorityColors = {
    High: 'text-high-priority',
    Medium: 'text-medium-priority',
    Low: 'text-low-priority',
  };

  const TaskItem = ({ task, updateTaskStatus, deleteTask, editTask, archiveTask, isArchivedView }) => {
    console.log('Task Message:', task.message);  // Letakkan di sini
  }  

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete task: ${task.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(task.id);
      }
    });
  };

  const handleEditMessage = () => {
    Swal.fire({
      title: 'Edit Task Message',
      input: 'text',
      inputLabel: 'Task Message',
      inputValue: task.message || '',
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: (message) => {
        console.log('Updated Message:', message);  // Cek pesan yang diinput
        editTask({ ...task, message }); // Pastikan message dikirim ke App.js
      }
    });
  };
  
  
  

  return (
    <div className="task-item card mb-2 p-3 d-flex flex-row justify-content-between align-items-center">
      <div>
        <h5 className={priorityColors[task.priority]}>{task.title}</h5>
        <p className="mb-1">Priority: <span className={priorityColors[task.priority]}>{task.priority}</span></p>
        <p className="mb-1">Message: {task.message || 'No message'}</p>

        <select
          value={task.status}
          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
          className="form-select task-status-select"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      <div>
        {!isArchivedView && (
          <button onClick={() => archiveTask(task.id)} className="btn archive-btn me-2">
            <FaArchive />
          </button>
        )}
        <button onClick={handleEditMessage} className="btn edit-btn me-2">
          <FaEdit />
        </button>
        <button onClick={handleDelete} className="btn delete-btn">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
