const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

// make model based on Schema
// Schema define a structure of a desired document inside a collection (in a database),  models will apply that schema to a particular model and then we use the model to interact with a collection of that name.
// eg: Workout.find();

// this will make 'Workout' Collection or table
module.exports = mongoose.model('Workout', workoutSchema)