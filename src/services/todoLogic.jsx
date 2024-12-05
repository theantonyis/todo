export const TodoLogic = {
    getTasksFromLocalStorage: () => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    },

    saveTasksToLocalStorage: (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    deleteTask: (tasks, index) => {
        if (index < 0 || index >= tasks.length) {
            throw new Error('Task does not exist!');
        }
        return tasks.filter((_, i) => i !== index);
    },

    toggleTask: (tasks, index) => {
        if (index < 0 || index >= tasks.length) {
            throw new Error('Task does not exist!');
        }
        return tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
    },

    handleEditTask: (tasks, index, newText) => {
        if (index < 0 || index >= tasks.length) {
            throw new Error('Task does not exist!');
        }
        return tasks.map((task, i) =>
            i === index ? { ...task, text: newText } : task
        );
    },

    validateTaskData: (task, category, priority) => {
        if (!task || task.trim() === '') {
            return 'Task cannot be empty!';
        }
        if (!category) {
            return 'Please select a category!';
        }
        if (!['high', 'medium', 'low'].includes(priority)) {
            return 'Invalid priority selected!';
        }
        return null;
    },

    filterTasks: (tasks, category, status) => {
        return tasks.filter(task => {
            let matchesCategory = true;
            let matchesStatus = true;

            if (category) {
                matchesCategory = task.category === category;
            }

            if (status) {
                if (status === "completed") {
                    matchesStatus = task.completed === true;
                } else if (status === "pending") {
                    matchesStatus = task.completed === false;
                }
            }

            return matchesCategory && matchesStatus;
        });
    }
};
