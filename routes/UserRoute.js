const express = require('express');
const router = express.Router();
const Users = require("../models/users")


router.get("/rudra", (req, res) => {
    res.json({ msg: "Hi Rudra" })
})

router.post("/register", (req, res) => {
    console.log('Registerbody==', req.body);
    let obj = Users.findOne({ email: req.body.email }).then(data => {
        if (data) {
            return res.status(500).json({ message: 'email ID already present' })
        }
        else if (!data) {
            Users.create(req.body).then((obj) => {
                console.log('obj here==', obj)
                res.json({ message: 'User Successfully Registered', id: obj.id, name: obj.name });
            }).catch((e) => {
                res.status(500).json({ message: e })
            })
        }
    }).catch(e => { return res.status(500).json({ message: e }) })

})

router.post("/login", (req, res) => {
    console.log('login body==', req.body);
    Users.findOne({ email: req.body.email, password: req.body.password }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        else {
            res.status(200).json({ message: "Login Successfull", id: user.id, name: user.name });
        }
    }).catch(e=>{
        res.status(500).send({ message: err });
    })
})

module.exports = router;