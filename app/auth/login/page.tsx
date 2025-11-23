'use client';
import { useState } from 'react';
import { login } from '@/lib/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await login(email, password);
        window.location.href = '/dashboard';
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                className="w-full border p-2 rounded mb-4"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="w-full border p-2 rounded mb-4"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                className="w-full bg-blue-600 text-white p-2 rounded"
                onClick={handleLogin}
            >
                Login
            </button>

            {/* Register Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/auth/register" className="text-blue-600 hover:underline">
                    Register
                </a>
            </p>
        </div>
    );
}
