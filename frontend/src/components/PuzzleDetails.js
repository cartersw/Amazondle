 const PuzzleDetails = ({ puzzle }) => {
    return (
        <div className="puzzle-details">
            <h4>{puzzle.puzzleName}</h4>
            <p><strong> Solution: </strong> {puzzle.solution}</p>
            <p><strong> Difficulty: </strong> {puzzle.difficulty}</p>
            <p><strong> Description: </strong> {puzzle.description}</p>
            <p>{puzzle.createdAt}</p>
        </div>
    )
 }

 export default PuzzleDetails;