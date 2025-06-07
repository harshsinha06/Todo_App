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

export default App
