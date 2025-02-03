import React, { useState } from 'react';
import TimerList from './TimerList';
import TimerForm from './TimerForm';
import { Plus } from 'lucide-react';

const TimerDashboard = () => {
  const [timers, setTimers] = useState([
    {
      id: 1,
      title: 'Mow the lawn',
      category: 'House Chores',
      time: '01:30:56',
      isRunning: false
    },
    {
      id: 2,
      title: 'Clear paper jam',
      category: 'Office Chores',
      time: '00:21:13',
      isRunning: false
    },
    {
      id: 3,
      title: 'Ponder origins of universe',
      category: 'Life Chores',
      time: '14:00:29',
      isRunning: true
    }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateTimer = (timer) => {
    const newTimer = {
      ...timer,
      id: Date.now(),
      time: '00:00:00',
      isRunning: false
    };
    setTimers([...timers, newTimer]);
    setIsFormOpen(false);
  };

  const handleStart = (id) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, isRunning: true } : timer
    ));
  };

  const handleStop = (id) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, isRunning: false } : timer
    ));
  };

  const handleEdit = (editedTimer) => {
    setTimers(timers.map(timer => 
      timer.id === editedTimer.id ? { ...timer, ...editedTimer } : timer
    ));
  };

  const handleDelete = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Timers</h1>
      
      <TimerList
        timers={timers}
        onStart={handleStart}
        onStop={handleStop}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen ? (
        <TimerForm
          onSubmit={handleCreateTimer}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <button 
          onClick={() => setIsFormOpen(true)}
          className="w-full mt-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );
};

export default TimerDashboard;