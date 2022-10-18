var express = require('express');
var router = express.Router();

const userController = require('./user');
const postController = require('./post');

router.get('/', async (req, res) => {
    res.status(200).json({
        name   : 'API', 
        version: '1.0', 
        status : 200, 
        message: 'Bienvenue sur l\'API !'
    });
});

router.use('/users', userController);
router.use('/posts', postController);

module.exports = router;
