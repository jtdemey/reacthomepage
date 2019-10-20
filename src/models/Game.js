import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
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

const gameModel = mongoose.model('Game', gameSchema);

export default gameModel;