import TodoItem from './TodoItem';

const TodoList = ({ tasks, handleToggleTask, handleDeleteTask, handleEditTask }) => {
    return (
        <ul className="space-y-4 sm:space-y-6">
            {tasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks available</p>
            ) : (
                tasks.map((task, index) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        index={index}
                        handleToggleTask={handleToggleTask}
                        handleDeleteTask={handleDeleteTask}
                        handleEditTask={handleEditTask}
                    />
                ))
            )}
        </ul>

    );
};

export default TodoList;
