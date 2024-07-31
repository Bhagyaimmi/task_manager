const express = require('express');
const router = express.Router();
const Task = require('./models/Task');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Create Task
router.post('/', protect, async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;
    try {
        const task = new Task({ user: req.user, title, description, status, priority, deadline });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Tasks
router.get('/', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Task
router.put('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Task
router.delete('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task.user.toString() !== req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await task.remove();
        res.json({ message: 'Task removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
