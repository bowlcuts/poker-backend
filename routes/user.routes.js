const router = require("express").Router();
const User = require('../models/User.model');

const bcryptjs = require('bcryptjs');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const { update } = require("../models/User.model");



router.get('/profile', isAuthenticated, (req, res, next) => {
    const userId = req.payload._id

    User.findById(userId)
    .then((foundUser) => {
        console.log(foundUser)
        res.json(foundUser)
    })
    .catch(err => console.log(err))
} )

router.put('/profile', isAuthenticated, (req, res, next) => {
    const userId = req.payload._id
    const { name, email, password } = req.body

    User.findOneAndUpdate(
        { _id: userId },
        { name: name, email: email },
        { new: true }
      )
    .then((updatedUser) => {
        console.log(updatedUser)
        res.json(updatedUser)
    })
    .catch(err => console.log(err))
})

router.post('/profile/:id/delete', isAuthenticated, (req, res, next) => {
    console.log('THIS IS THE SENT PASSWORD', req.body.password)
    console.log('THIS IS THE USER ID', req.params.id)

    User.findById( req.params.id )
    .then(foundUser => {
        console.log('THIS IS THE FOUND USER', foundUser)
        const passwordMatch = bcryptjs.compareSync(req.body.password, foundUser.password)
        console.log('PASSWORD MATCH VALUE', passwordMatch)

      if(passwordMatch) {
        foundUser.delete()
        res.json(foundUser)
      } else {
        res.json({message: 'Incorrect password'})
      }
    })
    .catch(err => res.send(err))

})

module.exports = router;