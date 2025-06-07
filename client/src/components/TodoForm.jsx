export function TodoForm({mode, todo, setTodo, onCancel, onSubmit}) {
    const isAdd = (mode === "add");
    return(
        <div className="mt-10 bg-white p-6 rounded-xl shadow border border-gray-200 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{isAdd? "Add Todo" : "Add New Todo"}</h2>

            <label className="block text-gray-700 font-bold mb-1">Title</label>
            <input type="text" placeholder="Title" className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring"
              value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />

            <label className="block text-gray-700 font-bold mb-1">Description</label>
            <textarea placeholder="Description" className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring" rows={3}
              value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />

            {!isAdd && <div className="flex items-center mb-4">
              <input id="done" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                checked={todo.done} onChange={(e) => setTodo({ ...todo, done: e.target.checked })} />
              <label htmlFor="done" className="ml-2 block text-gray-700 font-medium">Mark as Done</label>
            </div>}

            <div className="flex justify-end gap-4 mt-3">
              <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={onSubmit} disabled={!todo.title.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"> Save </button>
            </div>
          </div>
    )
}