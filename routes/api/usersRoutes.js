const router = require('express').Router();

//Destructure to get the methods found inside controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


module.exports = router;