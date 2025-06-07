import axios from "axios";
import { useEffect, useState } from "react";
import { TodoCard } from "../components/TodoCard";
import { TodoForm } from "../components/TodoForm";

export function TodoDashboard() {
  const [todos, setTodos] = useState([]);

  const [showAddInput, setShowAddInput] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", priority: 2 });
  const [editTodo, setEditTodo] = useState(null);

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/todos", {
          headers: {
            Authorization: token
          }
        });
        setTodos(response.data.todos);
        console.log(response.data.todos);
      }
      catch (err) {
        console.error("Failed to fetch todos", err);
      }
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = () => {
    setShowAddInput(true);
  };

  const handleCreate = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post("http://localhost:3000/todos", {
          title: newTodo.title.trim(),
          description: newTodo.description.trim(),
          priority: newTodo.priority,
          done: false
        },
          {
            headers: { Authorization: token }
          }
        );
        console.log("Todo Created:", response.data?.message);
        setNewTodo({ title: "", description: "", priority: 2 });
        setShowAddInput(false);

        // Refresh the list
        fetchTodos();
      }
      catch (err) {
        console.error("Error creating todo:", err.response?.data || err.message);
      }
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.delete(`http://localhost:3000/todos/${id}`, {
          headers: { Authorization: token }
        });

        fetchTodos();
      }
      catch (err) {
        console.error("Failed to delete todo", err);
      }
    }
  }



  const updateTodo = (todo) => {
    setEditTodo(todo);
    setShowEdit(true);
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.put(`http://localhost:3000/todos/${id}`, {
          title: editTodo.title,
          description: editTodo.description,
          priority: editTodo.priority,
          done: editTodo.done
        },
          {
            headers: { Authorization: token }
          }
        );
        console.log("Todo Updated:", response.data?.message);
        setEditTodo(null);
        setShowEdit(false);

        // Refresh the list
        fetchTodos();
      }
      catch (err) {
        console.error("Error updating todo:", err.response?.data || err.message);
      }
    }
    setShowEdit(false);
  }


  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Your Todos</h1>
          <button onClick={addTodo} className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 cursor-pointer">+ Add Todo</button>
        </header>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {todos.slice().sort((a, b) => a.priority - b.priority) // 1 (High) comes before 2 (Medium), then 3 (Low)
            .map((todo) => (<TodoCard key={todo._id} todo={todo} onEdit={updateTodo} onDelete={handleDelete} />))}
        </div>

        {showAddInput && (
          <TodoForm mode={"add"} todo={newTodo} setTodo={setNewTodo} onCancel={() => setShowAddInput(false)} onSubmit={handleCreate} />
        )}

        {showEdit && (
          <TodoForm mode={"edit"} todo={editTodo} setTodo={setEditTodo} onCancel={() => setShowEdit(false)} onSubmit={() => handleUpdate(editTodo._id)} />
        )}

        {todos.length === 0 && (<p className="text-center text-gray-500 text-lg mt-20">You have no todos yet.</p>)}

      </div>

    </div>
  );
}
