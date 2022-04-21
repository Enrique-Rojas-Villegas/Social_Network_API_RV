const { Thought, User } = require('../models');

module.exports = {
    // GET ALL METHOD
    getThoughts(req, res) {
        Thought.find()
            .populate('reactions', '-__v')
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // GET METHOD by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions', '-__v')
            .select('-__v')
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            )
        .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
        });
    },

    
    // POST METHOD
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'thought created but no user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'There is no thought with that ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'The thought was deleted, but no user was found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'There is no thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidatiors: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'There is no thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};