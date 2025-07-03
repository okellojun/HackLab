import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  switchToRegister: () => void;
  onLoginWithGitHub: () => void;
  onLoginWithGoogle: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onLogin,
  switchToRegister,
  onLoginWithGitHub,
  onLoginWithGoogle
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <button
          onClick={onLoginWithGitHub}
          className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.1.823 2.22 0 1.606-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
              clipRule="evenodd"
            />
          </svg>
          <span>Login with GitHub</span>
        </button>

        <button
          onClick={onLoginWithGoogle}
          className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M12 10.2v3.6h5.4c-.2 1.2-1.5 3.5-5.4 3.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.1 4 14.2 3 12 3 6.5 3 2 7.5 2 13s4.5 10 10 10c5.8 0 9.7-4 9.7-9.7 0-.7 0-1.2-.1-1.8H12z"
            />
          </svg>
          <span>Login with Google</span>
        </button>
      </div>

      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <button
          onClick={switchToRegister}
          className="text-purple-600 hover:underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
};
