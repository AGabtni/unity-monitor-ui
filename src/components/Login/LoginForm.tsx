import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ username, password });
      setSuccess(true);
      setUsername('');
      setPassword('');

      // TODO : Redirect after delay
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        {success && (
          <div className="message-success">
            Login successful! Redirecting...
          </div>
        )}

        {error && (
          <div className="message-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;