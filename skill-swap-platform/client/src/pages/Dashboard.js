import React, { useState, useEffect } from 'react';
import API from '../api/axios';

export default function Dashboard() {
    const [form, setForm] = useState({
        name: '', location: '', visibility: 'public',
        availability: [], skillsOffered: '', skillsWanted: ''
    });

    const fetchProfile = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setForm({
                ...form,
                ...user,
                skillsOffered: user.skillsOffered?.join(', ') || '',
                skillsWanted: user.skillsWanted?.join(', ') || ''
            });
        }
    };

    useEffect(() => { fetchProfile(); }, []);

    const handleUpdate = async () => {
        try {
            const payload = {
                ...form,
                skillsOffered: form.skillsOffered.split(',').map(s => s.trim()),
                skillsWanted: form.skillsWanted.split(',').map(s => s.trim())
            };
            const res = await API.put('/users/update', payload);
            localStorage.setItem('user', JSON.stringify(res.data));
            alert('Profile updated');
        } catch (err) {
            alert('Update failed');
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded">
            <h2 className="text-xl mb-4">My Profile</h2>
            <div className="grid grid-cols-1 gap-4">
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2" placeholder="Name" />
                <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="border p-2" placeholder="Location" />
                <input value={form.skillsOffered} onChange={e => setForm({ ...form, skillsOffered: e.target.value })} className="border p-2" placeholder="Skills Offered (comma-separated)" />
                <input value={form.skillsWanted} onChange={e => setForm({ ...form, skillsWanted: e.target.value })} className="border p-2" placeholder="Skills Wanted (comma-separated)" />
                <select value={form.visibility} onChange={e => setForm({ ...form, visibility: e.target.value })} className="border p-2">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <button onClick={handleUpdate} className="bg-blue-600 text-white py-2">Update Profile</button>
            </div>
        </div>
    );
}
