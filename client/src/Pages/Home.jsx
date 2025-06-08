import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../api';
import { useEffect, useState } from "react";

export function HomePage() {
    const [name, setName] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchname = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`${API_BASE_URL}/me`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    setName(response.data?.name);
                }
                catch (err) {
                    console.error("Failed to fetch name:", err);
                    localStorage.removeItem("token");
                }
            }
        }

        fetchname();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setName(null);
        navigate('/');
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Todo App</h1>
                <nav className="space-x-4">
                    {name ? (
                        <>
                            <span className="text-gray-700">Welcome, <strong>{name.split(' ')[0]}</strong></span>
                            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
                        </>
                        ) : (
                        <>
                            <button onClick={() => navigate('/login')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
                            <button onClick={() => navigate('/signup')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Register</button>
                        </>)}
                </nav>
            </header>
            <main className="flex-grow flex justify-center items-center">
                <section className="text-center">
                    <h2 className="text-3xl font-semibold mb-6">Welcome to the Todo App</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Organize your tasks, boost your productivity, and stay on top of your goals — all in one place.
                    </p>
                    <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">Go to Dashboard</button>
                </section>
            </main>

            <footer className="text-center p-4 text-gray-500">
                &copy;Todo App
            </footer>
        </div>
    );
}