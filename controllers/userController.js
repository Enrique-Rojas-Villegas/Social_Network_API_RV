const { User, Thought } = require('../models');

module.exports = {
// GET ALL METHOD
    getUsers(req, res) {
        User.find()
            .populate('thoughts', '-__v')
            .populate('friends', '-__v')
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

// GET METHOD by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts', '-__v')
            .populate('friends', '-__v')
            .select('-__v')
            .then((users) =>
            !users
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(users)
            )
        .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
        });
    },

// POST METHOD
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

// PUT METHOD
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No course with this id!' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No User with that ID' })
                : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
};