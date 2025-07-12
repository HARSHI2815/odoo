import React, { useState } from 'react';
import API from '../api/axios';

export default function Search() {
    const [skill, setSkill] = useState('');
    const [results, setResults] = useState([]);

    const search = async () => {
        const res = await API.get(`/users/search?skill=${skill}`);
        setResults(res.data);
    };

    const sendRequest = async (toUser, offeredSkill, wantedSkill) => {
        await API.post('/swaps', { toUser, offeredSkill, wantedSkill });
        alert('Request sent');
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
            <h2 className="text-xl mb-4">Search Users by Skill</h2>
            <input value={skill} onChange={e => setSkill(e.target.value)} className="border p-2 w-full mb-4" placeholder="e.g., Photoshop" />
            <button onClick={search} className="bg-blue-500 text-white px-4 py-2 mb-4">Search</button>

            {results.map(user => (
                <div key={user._id} className="border-b py-2">
                    <p><strong>{user.name}</strong> — {user.location || 'Unknown'}</p>
                    <p>Offered: {user.skillsOffered.join(', ')}</p>
                    <p>Wanted: {user.skillsWanted.join(', ')}</p>
                    <button
                        onClick={() => sendRequest(user._id, user.skillsOffered[0], user.skillsWanted[0])}
                        className="mt-2 bg-green-600 text-white px-3 py-1">
                        Send Swap Request
                    </button>
                </div>
            ))}
        </div>
    );
}
