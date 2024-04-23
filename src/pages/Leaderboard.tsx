// Leaderboard.tsx
import React from 'react';

const Leaderboard = () => {
    // Example mock data structure
    const users = [
        { id: 1, name: 'Lebron James', score: 98 },
        { id: 2, name: 'Devin Booker', score: 95 },
        { id: 3, name: 'Kevin Durant', score: 90 },
        // More users can be added here
    ];

    return (
        <div className="leaderboard-container">
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
