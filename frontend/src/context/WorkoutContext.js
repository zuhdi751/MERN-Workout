import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS' : 
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUTS' :
            return {
                workouts: [action.payload, ...state.workouts]
            }
        default:
            return state
    }
}

// provide a context to our application component tree so our component can access it.
export const WorkoutsContextProvider = ( {children} ) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts:null
    })

    // return a template. in this case we use WorkoutsContext.Provider
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}