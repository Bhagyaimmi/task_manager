
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTasks } from '../store/taskSlice';
import TaskCard from './TaskCard';

const TaskBoard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div>
            {loading && <p>Loading tasks...</p>}
            {error && <p>{error}</p>}
            <div>
                {tasks.map(task => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;
