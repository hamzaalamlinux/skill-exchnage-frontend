'use client';
import { useState } from 'react';
import { register } from '@/lib/auth';
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async () => { await register({ name, email, password }); window.location.href = '/dashboard'; };
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input className="w-full border p-2 rounded mb-4" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input className="w-full border p-2 rounded mb-4" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" className="w-full border p-2 rounded mb-4" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="w-full bg-blue-600 text-white p-2 rounded" onClick={handleRegister}>Register</button>
        </div>
    );
}