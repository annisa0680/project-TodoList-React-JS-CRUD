import React, { useState } from 'react';
import Swal from 'sweetalert2';

function AddTask({ addTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('None'); // Set default to "None"
  const [message, setMessage] = useState(''); // New state for message

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Konfirmasi',
      text: `Apakah Anda yakin ingin menambahkan tugas ini?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, tambahkan!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Tambahkan message di sini, pastikan dikirim ke addTask
        addTask({ id: Date.now(), title, priority, status: 'To Do', message });
        setTitle('');
        setPriority('None');
        setMessage('');
      }
    });
  };
  

  return (
    <form onSubmit={handleSubmit} className="mb-4 add-task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control mb-2"
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="form-control mb-2"
      >
        <option value="None">None</option> {/* New default option */}
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <textarea
        placeholder="Task message"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Pastikan perubahan state berjalan dengan benar
        className="form-control mb-2"
      />

      <button type="submit" className="btn btn-primary w-100">Tambahkan Tugas</button>
    </form>
  );
}

export default AddTask;
