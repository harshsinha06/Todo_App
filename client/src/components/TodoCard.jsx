export function TodoCard({ todo, onEdit, onDelete }) {

    const getPriorityLabel = (value) => {
    if (value === 1) return "High";
    if (value === 2) return "Medium";
    return "Low";
  };

  const getPriorityColor = (value) => {
    if (value === 1) return "bg-red-100 text-red-700";
    if (value === 2) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

    return (
      <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-200 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{todo.title}</h2>
          <p className="text-gray-600 mt-2">{todo.description}</p>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${todo.done ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {todo.done ? "Done" : "Pending"}
          </span>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${getPriorityColor(todo.priority)}`}>
            {getPriorityLabel(todo.priority)} Priority
          </span>
          <div className="ml-2 flex gap-2">
            <button onClick={() => onEdit(todo)} className="text-blue-600 hover:underline text-sm">Edit</button>
            <button onClick={() => onDelete(todo._id)} className="text-red-600 hover:underline text-sm">Delete</button>
          </div>
        </div>
      </div>
    );
  }
  