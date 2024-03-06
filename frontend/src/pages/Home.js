import { useEffect, useState } from "react";


//components
import PuzzleDetails from '../components/PuzzleDetails'

const Home = () => {
    const [puzzles, setPuzzles] = useState(null)
    useEffect(() => {
        const fetchPuzzles = async () => {
            const response = await fetch('http://localhost:4000/api/puzzles')
            const json = await response.json()

            if (response.ok) {
                
                setPuzzles(json)
            }
        }

        fetchPuzzles()
    }, [])

    return (
        <div className="home">
            <div className="puzzles">
            {puzzles && puzzles.map(puzzle => (
                <PuzzleDetails key={puzzle._id} puzzle = {puzzle}/>
        ))}
            </div>
        </div>
    )
}

export default Home;