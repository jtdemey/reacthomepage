import mongoose from 'mongoose';

const makeGameSchema = () => new mongoose.Schema({
    gameId: String,
    gameTitle: String, 
    host: String,
    isPaused: Boolean,
    players: Array,
    phase: String, 
    remainingTime: Number, 
    scenario: String,
    condition: String,
    tick: Number,
    votes: Array 
});

export default makeGameSchema;