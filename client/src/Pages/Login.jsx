import { useState } from 'react'
import { Input } from '../components/Input'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate('/home');
      }
    }

    catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      console.log('Login failed', msg);
    }

  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <main className="flex-grow flex justify-center items-center">
        <div className='w-[350px] h-auto p-5 bg-white rounded-xl'>
          <h1 className='text-3xl font-bold text-center mb-4'>Login</h1>
          <form className='flex flex-col gap-4'>
            <Input label_name="Email" placeholder="Enter email" type="text" name="email" onChange={handleChange} />
            <Input label_name="Password" placeholder="Enter password" type="password" name="password" onChange={handleChange} />
            <button type="submit" disabled={!isValidEmail} className='mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50'
              onClick={handleSubmit}>Login</button>
          </form>
          {error && (<div className="text-red-600 mt-2 text-sm text-center">{error}</div>)}
          <div className='mt- text-center'>
            New Here? <button className='text-blue-600 hover:text-blue-500' onClick={() => navigate('/signup')}>Create a new account</button>
          </div>
        </div>
      </main>
    </div>
  )
}