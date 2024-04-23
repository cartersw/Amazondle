// About.tsx
import React from 'react';
import './about.css'; // Assuming you will create a separate CSS file for styles
import logo from "./lebron.png";


const teamMembers = [
    { name: "Carter Wildenradt", role: "Project Manager/Database", imageUrl: logo },
    { name: "Yahya Alrahmani", role: "Frontend Web", imageUrl: logo },
    { name: "Carlos Vasquez", role: "Frontend Web", imageUrl: logo },
    { name: "Gabriel Parra", role: "Frontend Mobile", imageUrl: logo },
    { name: "Jhon Tabio", role: "API", imageUrl: logo },
    { name: "Dario Sansotta", role: "API", imageUrl: logo }
];

function About() {
    return (
        <div className="about-container">
            <div className="team-container">
                {teamMembers.map(member => (
                    <div className="team-member" key={member.name}>
                        <img src={member.imageUrl} alt={member.name} />
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
