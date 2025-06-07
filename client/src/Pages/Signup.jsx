import { useState } from 'react'
import { Input } from '../components/Input'
import axios from 'axios';
import { API_BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';

export function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!verified) {
      setError('Please verify your Email first');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, formData);
      navigate('/login');
    }
    catch (err) {
      const msg = err.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
    }
  };


  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-otp`, {
        email: formData.email
      })
      setOtpSent(true);
      setError(response.data?.message);
    }
    catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP.";
      setError(msg);
    }
  }

  const handleVerifyOtp = async () => {
    try {
      const respose = await axios.post(`${API_BASE_URL}/verify-otp`, {
        email: formData.email,
        otp: otp
      });
      setError(respose.data?.message);
      setVerified(true);
    } catch (err) {
      const msg = err.response?.data?.message || "OTP verification failed.";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <main className="flex-grow flex justify-center items-center">
        <div className='w-[350px] h-auto p-5 bg-white rounded-xl'>
          <h1 className='text-3xl font-bold text-center mb-4'>Register</h1>
          <form className='flex flex-col gap-4'>
            <Input label_name="Name" placeholder="Enter name" type="text" name="name" onChange={handleChange} />
            <Input label_name="Email" placeholder="Enter email" type="text" name="email" onChange={handleChange} />

            {!otpSent && (
              <button type="button" disabled={!isValidEmail} className='bg-blue-600 text-white py-2 rounded hover:bg-blue-500 disabled:opacity-50' onClick={handleSendOtp}>Send OTP</button>

            )}

            {otpSent && !verified && (
              <>
                <Input label_name="Enter OTP" placeholder="Enter OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <button type="button" className='bg-green-600 text-white py-2 rounded hover:bg-green-500' onClick={handleVerifyOtp}>Verify OTP</button>
              </>
            )}
            <Input label_name="Password" placeholder="Enter password" type="password" name="password" onChange={handleChange} />
            <button type="submit" className='mt-4 bg-black text-white py-2 rounded hover:bg-gray-800' onClick={handleSubmit}>Register</button>
          </form>
          {error && (<div className='text-red-600 mt-2 text-sm text-center'>{error}</div>)}
          <div className='mt- text-center'>
            Already have account? <button className='text-blue-600 hover:text-blue-500' onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </main>
    </div>
  )
}