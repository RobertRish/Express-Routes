const { User } = require('../models');

const usersController = {
    // GET ALL users
    getAllUsers(req, res) {
        User.find()
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // GET by :id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => {
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // Add a friend POST /api/users/:userId/friends/:friendId
    addFriend({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId },
            { $push: { friends: { _id: params.friendId } } })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // Deletes a friend by id /api/users/:userId/friends/:friendId
    deleteFriend({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId },
            {
                $pull: { friends: params.friendId }
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    // PUT updates user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // DELETE a user 
    deleteUser({ params }, res) {
        User.findOneAndDelete(
            { _id: params.id }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
};


module.exports = usersController;