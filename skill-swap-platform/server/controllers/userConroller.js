const User = require('../models/User');

exports.getPublicProfiles = async (req, res) => {
    const skill = req.query.skill;
    try {
        const users = await User.find({
            visibility: 'public',
            $or: [
                { skillsOffered: { $regex: skill, $options: 'i' } },
                { skillsWanted: { $regex: skill, $options: 'i' } }
            ]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};
