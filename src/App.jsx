import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter'; // Import TodoFilter component
import { TodoLogic } from './services/TodoLogic';
import 'animate.css';

const App = () => {
    const [task, setTask] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('medium');
    const [tasks, setTasks] = useState(() => {
        const savedTasks = TodoLogic.getTasksFromLocalStorage();
        return Array.isArray(savedTasks) ? savedTasks : [];
    });

    const [filter, setFilter] = useState({ category: '', status: '' });
    const [error, setError] = useState('');
    const [editError, setEditError] = useState('');

    useEffect(() => {
        TodoLogic.saveTasksToLocalStorage(tasks);
    }, [tasks]);

    const handleAddTask = () => {
        const validationError = TodoLogic.validateTaskData(task, category, priority);
        if (validationError) {
            setError(validationError);
            return;
        }

        const newTask = { text: task, completed: false, category, priority, id: Date.now() };
        setTasks([...tasks, newTask]);
        setTask('');
        setCategory('');
        setPriority('medium');
        setError('');
    };

    const handleDeleteTask = (index) => {
        try {
            const updatedTasks = TodoLogic.deleteTask(tasks, index);
            setTasks(updatedTasks);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggleTask = (index) => {
        try {
            const updatedTasks = TodoLogic.toggleTask(tasks, index);
            setTasks(updatedTasks);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditTask = (index) => {
        const newText = prompt('Edit Task:', tasks[index].text);
        if (!newText || newText.trim() === '') {
            setEditError('Task cannot be empty!');
            return;
        }

        try {
            const updatedTasks = TodoLogic.handleEditTask(tasks, index, newText);
            setTasks(updatedTasks);
            setEditError('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFilterChange = (category, status) => {
        setFilter({ category, status });
    };


    const clearFilter = () => {
        setFilter({ category: '', status: '' });
    };

    const filteredTasks = TodoLogic.filterTasks(tasks, filter.category, filter.status);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">To-Do Application</h1>

            {/* Task Input Section */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-sm hover:border-blue-400"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-40 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-sm hover:border-blue-400"
                >
                    <option value="" disabled>Category</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                </select>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-32 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-sm hover:border-blue-400"
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 w-auto rounded-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-center whitespace-nowrap"
                >
                    Add Task
                </button>
            </div>

            {/* Error message */}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {editError && <div className="text-red-500 text-center mb-4">{editError}</div>}

            {/* Filters Section using TodoFilter component */}
            <TodoFilter filter={filter} onFilterChange={handleFilterChange} clearFilter={clearFilter} />

            {/* Task List */}
            <TodoList
                tasks={filteredTasks}
                handleToggleTask={handleToggleTask}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
            />
        </div>
    );
};

export default App;
