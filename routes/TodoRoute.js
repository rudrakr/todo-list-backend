const express = require('express');
const router = express.Router();
const Todos = require("../models/todos")


router.get("/:id", (req, res) => {
    console.log('todos id=', req.params.id);
    Todos.findOne({ id: req.params.id }).then(( todo) => {
        if (!todo) {
            res.status(200).json([])
        } else {
            res.status(200).json(todo)
        }
    }).catch(e => {
        return res.status(500).json({ message: 'Todo list nNot Found' })
    });
})


router.post("/create", async (req, res) => {
    console.log('body==', req.body);
    //First Find if todo already created for the ID
    try {
        const todo = await Todos.findOne({ id: req.body.id });
        //If todo not created for the ID , create
        if (!todo) {
            console.log('No Data Found')
            try {
                const obj = await Todos.create(req.body);
                res.json(obj);
            }
            catch (e) {
                res.status(500).json({ err: 'error while creating' })
            }
        }
        //If todo already present then first delete the previous data and then create again
        else if (todo) {
            console.log('Data Found')
            try {
                const deletedData = await Todos.deleteOne({ id: req.body.id });
                if (deletedData) {
                    try {
                        const obj = await Todos.create(req.body);
                        res.json(obj);
                    }
                    catch (e) {
                        res.status(500).json({ err: 'error while creating' })
                    }
                }
            }
            catch (e) {
                return res.status(500).json({ message: 'delet previous data not successfull' })
            }
        }
    }
    catch (e) {
        console.log('error on Finding')
        return res.status(500).json({ message: 'Data not found' });
    }
})

module.exports = router;