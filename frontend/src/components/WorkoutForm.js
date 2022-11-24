import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, SetTitle] = useState('')
    const [load,setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),  //this will convert wrkout string into json
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            SetTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUTS', payload: json})
        }
    }

    return (
        <form className="create" onSubmit= {handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Excersize Title:</label>
            <input 
                type="text"
                onChange={(e) => SetTitle(e.target.value)}
                value={title}                
            />

            <label>Load (in Kg)</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}                
            />

            <label>Reps</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}                
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default WorkoutForm