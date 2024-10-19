const express = require('express')
const router = express.Router()
const usercontroller = require ('../controllers/usercontroller')
const UserModel = require('../models/User')


router.post('/add-user', usercontroller.createuser)
router.get('/allusers', usercontroller.getUser)
router.delete('/deleteuser/:id', usercontroller.deleteUser)
router.put('/updateuser/:id', usercontroller.editUser)

module.exports = router