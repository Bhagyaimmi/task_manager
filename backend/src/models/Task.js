const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['To-Do', 'In Progress', 'Under Review', 'Completed'], default: 'To-Do' },
    priority: { type: String, enum: ['Low', 'Medium', 'Urgent'], default: 'Low' },
    deadline: { type: Date }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
