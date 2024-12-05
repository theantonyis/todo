const TodoItem = ({ task, index, handleToggleTask, handleDeleteTask, handleEditTask }) => {
    const { text, completed, category, priority, deleteAnim } = task;

    return (
        <li
            key={index}
            className={`flex justify-between items-center p-4 rounded-md border border-gray-300 transition-all duration-200 ${
                completed ? 'bg-green-100' : 'bg-white'
            } ${deleteAnim ? 'animate__animated animate__fadeOut' : 'animate__animated animate__fadeIn'}`}
        >
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleToggleTask(index)}
                    className="h-5 w-5 border border-gray-300 rounded-md"
                />
                <span
                    className={`text-lg ${completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}
                >
                    {text}
                </span>
                <span className="text-xs text-blue-500">{priority}</span>
                <span className="text-xs text-yellow-500">{category}</span>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => handleEditTask(index)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDeleteTask(index)}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
