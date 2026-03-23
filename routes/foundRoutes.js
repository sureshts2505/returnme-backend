const express = require("express");
const router = express.Router();
const upload = require("../upload/Multer");
const founds = require("../models/FoundModel");



router.post("/", upload.single("image"), async (req, res) => {
    try {
        const newItem = new founds({
            itemName: req.body.itemName,
            description: req.body.description,
            location: req.body.location,
            contact: req.body.contact,
            image: req.file ? req.file.filename : ""
        });

        await newItem.save();

        res.send("Found Item + Image saved successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get("/", async (req, res) => {
    try {
        const found = await founds.find();
        res.json(found);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



router.get("/:id", async (req, res) => {
    try {
        const found = await founds.findById(req.params.id);

        if (!found) {
            return res.status(404).send("Found Item not found");
        }

        res.json(found);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updatedData = {
            itemName: req.body.itemName,
            description: req.body.description,
            location: req.body.location,
            contact: req.body.contact,
        };

        if (req.file) {
            updatedData.image = req.file.filename;
        }

        const updatedItem = await founds.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).send("Found Item not found");
        }

        res.json(updatedItem);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const deletedItem = await founds.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).send("Found Item not found");
        }

        res.send("Found Item deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;