
import React from 'react';
import { Task } from './store/taskSlice';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Deadline: {task.deadline}</p>
        </div>
    );
};

export default TaskCard;
