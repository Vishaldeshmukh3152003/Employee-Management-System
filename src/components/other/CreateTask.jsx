import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [asignTo, setAsignTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const task = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    const updatedData = userData.map((emp) => {
      if (emp.firstName.toLowerCase() === asignTo.toLowerCase()) {
        const updatedTasks = [...emp.tasks, task];
        const updatedCounts = {
          ...emp.taskCounts,
          newTask: (emp.taskCounts?.newTask || 0) + 1,
        };
        toast.success("Task created successfully")
        return { ...emp, tasks: updatedTasks, taskCounts: updatedCounts };
      }
      return emp;
    });

    setUserData(updatedData);
    localStorage.setItem("authData", JSON.stringify({ employees: updatedData }));

    // Reset form
    setTaskTitle('');
    setCategory('');
    setAsignTo('');
    setTaskDate('');
    setTaskDescription('');
  };

  return (
    <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
      <form onSubmit={submitHandler} className='flex flex-wrap items-start justify-between w-full'>
        <div className='w-1/2'>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="text"
              placeholder='Make a UI design'
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="date"
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
            <input
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="text"
              placeholder='Employee name'
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="text"
              placeholder='Design, Dev, etc.'
            />
          </div>
        </div>

        <div className='flex flex-col items-start w-2/5'>
          <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400'
          />
          <button
            type="submit"
            className='w-full px-5 py-3 mt-4 text-sm rounded bg-emerald-500 hover:bg-emerald-600'
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
