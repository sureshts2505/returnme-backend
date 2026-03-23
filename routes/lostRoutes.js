
const express = require("express");
const router = express.Router();
const upload = require("../uploads/Multer");
const Lost = require("../models/LostModel");






router.post("/", upload.single("image"), async (req, res) => {
    try {
        const newItem = new Lost({
            itemName: req.body.itemName,
            description: req.body.description,
            location: req.body.location,
            contact: req.body.contact,
            image: req.file ? req.file.filename : ""
        });

        await newItem.save();

        res.send("Item + Image saved ");
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get("/", async (req, res) => {
    try {
        const items = await Lost.find();  
        res.json({ items });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const item = await Lost.findById(req.params.id);

        if (!item) {
            return res.status(404).send("Item not found");
        }

        res.json(item);
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

        const updatedItem = await Lost.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json(updatedItem);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deletedItem = await Lost.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).send("Item not found");
        }

        res.send("Item deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;