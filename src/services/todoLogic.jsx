export const TodoLogic = {
    getTasksFromLocalStorage: () => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    },

    saveTasksToLocalStorage: (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    deleteTask: (tasks, index) => {
        return tasks.filter((_, i) => i !== index);
    },

    toggleTask: (tasks, index) => {
        return tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
    },
};
