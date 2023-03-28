const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

router.get("/", function (req, res) {
    res.json({ items })
})


router.post("/", function (req, res, next) {
    const newItem = {
        name: req.body.name,
        price: req.body.price
    }
    items.push(newItem)
    res.status(201).json({ item: newItem })
})


router.get("/:name", function (req, res, next) {
    const foundItem = items.find(item => item.name == req.params.name)
    if (foundItem === undefinded) {
        throw new ExpressError("Item not found", 404)
    }
    res.json({ item: foundItem })
})


router.patch("/:name", function (req, res, next) {
    const foundItem = items.find(item => item.name == req.params.name)
    if (foundItem === undefinded) {
        throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name
    // foundItem.price = req.body.price
    res.json({ item: foundItem })
})


router.delete("/:name", function (req, res) {
    const foundCat = cats.findIndex(cat => cat.name === req.params.name)
    if (foundCat === -1) {
        throw new ExpressError("Cat not found", 404)
    }
    cats.splice(foundCat, 1)
    res.json({ message: "Deleted" })
})

router.delete("/:name", function (req, res, next) {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    item.splice(foundItem, 1)
    req.json({ message: "Deleted" })
})

module.exports = router;