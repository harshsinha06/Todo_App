import { Signup } from './Pages/Signup';
import { Login } from './Pages/Login';
import { HomePage } from './Pages/Home';
import { TodoDashboard } from './Pages/TodoDashboard';
import { BrowserRouter, Route, Routes, useNavigate, Outlet } from 'react-router-dom';



function App() {

  return (

    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/dashboard" element={<TodoDashboard />} />
      </Routes>
    </BrowserRouter>

  )
}

// function Layout() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Todo App</h1>
//         <button onClick={() => navigate('/login')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
//         <button onClick={() => navigate('/signup')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Register</button>
//       </header>


//       <main className="flex-grow">
//         <Outlet />
//       </main>

//       <footer className="text-center text-sm text-gray-500 p-4">
//         &copy; 2025 Todo App
//       </footer>
//     </div>

//   )
// }

export default App
