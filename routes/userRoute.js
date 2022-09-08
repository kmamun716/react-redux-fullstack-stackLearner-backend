const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/',(req, res)=>{
    res.send('user route is working porperly')
})
router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;