const Swap = require('../models/SwapRequest');
const Feedback = require('../models/Feedback');

exports.sendSwap = async (req, res) => {
    const { toUser, offeredSkill, wantedSkill } = req.body;
    try {
        const swap = await Swap.create({ fromUser: req.user.id, toUser, offeredSkill, wantedSkill });
        res.status(201).json(swap);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateSwap = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const swap = await Swap.findByIdAndUpdate(id, { status }, { new: true });
        res.json(swap);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.leaveFeedback = async (req, res) => {
    const { swapId, toUser, rating, comment } = req.body;
    try {
        const feedback = await Feedback.create({
            fromUser: req.user.id,
            toUser,
            swapId,
            rating,
            comment
        });
        res.status(201).json(feedback);
    } catch (err) {
        res.status(500).json(err);
    }
};
