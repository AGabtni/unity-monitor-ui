import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/Login/LoginForm';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}