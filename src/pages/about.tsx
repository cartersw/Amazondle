// About.tsx
import React from 'react';
import './about.css'; // Assuming you will create a separate CSS file for styles
import logo from "./lebron.png";
import yahya from "../assets/yahya.jpg"; 
import carlos from "../assets/carlos.jpg"; 
import gabriel from "../assets/gabu.jpg"; 
import jhon from "../assets/john.jpg"; 
import dario from "../assets/dario.jpg"; 



const teamMembers = [
    { name: "Carter Wildenradt", role: "Project Manager/Database", imageUrl: logo },
    { name: "Yahya Alrahmani", role: "Frontend Web", imageUrl: yahya },
    { name: "Carlos Vasquez", role: "Frontend Web", imageUrl: carlos },
    { name: "Gabriel Parra", role: "Frontend Mobile", imageUrl: gabriel },
    { name: "Jhon Tabio", role: " API", imageUrl: jhon },
    { name: "Dario Sansotta", role: "API", imageUrl: dario }
];

function About() {
    return (
        <div className="team-container">
            {teamMembers.map(member => (
                <div className="team-member" key={member.name}>
                    <img src={member.imageUrl} alt={member.name} />
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                </div>
            ))}
        </div>
    );
}

export default About;
