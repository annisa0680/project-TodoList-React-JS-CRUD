import React, { useState } from 'react';
import TaskItem from './TaskItem';


function TaskList({ tasks, updateTaskStatus, deleteTask, editTask, archiveTask, isArchivedView }) {
  const [filter, setFilter] = useState('All');

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);
  console.log('Filtered Tasks:', filteredTasks, );
  
  return (
    <div>
      <div className="mb-3">
        <label>Filter by status: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select w-50">
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}  
          archiveTask={archiveTask}
          isArchivedView={isArchivedView}
        />
      ))}
    </div>
    
  );
  
}

export default TaskList;
