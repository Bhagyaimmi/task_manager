
import React from 'react';
import TaskBoard from '../components/TaskBoard';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Task Management Application</h1>
            <TaskBoard />
        </div>
    );
};

export default HomePage;
