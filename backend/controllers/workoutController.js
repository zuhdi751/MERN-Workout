const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all workout
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt:-1})

    res.status(200).json(workouts)
}

//GET a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    // check from mongose if we are input a wrong id, to make sure our app is not crash due to those invalid id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: 'No such Workout'})
    }
    res.status(200).json(workout)
}

// POST or create a new workout
const createWorkout = async (req, res) => {
    // grab all properties from request body (with the help of app.use(express.json()))
    const {title, load, reps} = req.body
    // add everything from req.body into models db (Workout)
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)        
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(404).json({error: 'No such Workout'})
    }

    res.status(200).json(workout)
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error: 'No such Workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}