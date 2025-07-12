const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    location: String,
    photo: String,
    email: { type: String, required: true, unique: true },
    password: String,
    availability: [String],
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    skillsOffered: [String],
    skillsWanted: [String],
    isBanned: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
