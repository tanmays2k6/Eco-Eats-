const Food = require('../models/Food');

const getAllFood = async (req, res) => {
    try {
        const food = await Food.find();
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addFood = async (req, res) => {
    const { name, description, quantity, location, expiryDate } = req.body;
    try {
        const food = new Food({ name, description, quantity, location, expiryDate });
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllFood, addFood };
