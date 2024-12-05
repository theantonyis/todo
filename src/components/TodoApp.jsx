import React, { useState, useEffect } from 'react';
import { TodoLogic } from '../services/todoLogic';

const TodoApp = () => {
    const [task, setTask] = useState('');

    const [tasks, setTasks] = useState(() => {
        const savedTasks = TodoLogic.getTasksFromLocalStorage();
        return Array.isArray(savedTasks) ? savedTasks : [];
    });

    useEffect(() => {
        TodoLogic.saveTasksToLocalStorage(tasks);
    }, [tasks]);

    const handleAddTask = () => {
        if (task.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }
        setTasks([...tasks, { text: task, completed: false }]);
        setTask('');
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = TodoLogic.deleteTask(tasks, index);
        setTasks(updatedTasks);
    };

    const handleToggleTask = (index) => {
        const updatedTasks = TodoLogic.toggleTask(tasks, index);
        setTasks(updatedTasks);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="ww-full sm:max-w-md md:max-w-xl lg:max-w-2xl p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">To-Do Application</h1>

                {/* Task Input and Add Button */}
                <div className="flex mb-6">
                    <input
                        type="text"
                        className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a new task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button
                        onClick={handleAddTask}
                        className="ml-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Add
                    </button>
                </div>

                {/* Task List */}
                <ul className="space-y-4">
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleTask(index)}
                                        className="h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 focus:outline-none"
                                    />
                                    <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {task.text}
                  </span>
                                </div>
                                <button
                                    onClick={() => handleDeleteTask(index)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No tasks available</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TodoApp;
