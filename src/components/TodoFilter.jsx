const TodoFilter = ({ filter, onFilterChange, clearFilter }) => {
    const handleCategoryChange = (e) => {
        onFilterChange(e.target.value, filter.status);
    };

    const handleStatusChange = (e) => {
        onFilterChange(filter.category, e.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
                value={filter.category}
                onChange={handleCategoryChange}
                className="w-full sm:w-40 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-sm hover:border-blue-400"
            >
                <option value="" disabled>Category</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
            </select>
            <select
                value={filter.status}
                onChange={handleStatusChange}
                className="w-full sm:w-40 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out shadow-sm hover:border-blue-400"
            >
                <option value="" disabled>Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
            <button
                onClick={clearFilter}
                className="w-full sm:w-32 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 focus:outline-none transition-all duration-300 ease-in-out"
            >
                Clear Filter
            </button>
        </div>
    );
};

export default TodoFilter;
