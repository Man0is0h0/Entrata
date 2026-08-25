const taskService = require('../services/taskService');

// UUID v4 validation regex
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const taskController = {
    getTasks: async (req, res) => {
        try {
            const tasks = await taskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ error: 'Internal server error while fetching tasks' });
        }
    },

    createTask: async (req, res) => {
        try {
            const { text } = req.body;
            if (!text || typeof text !== 'string' || text.trim() === '') {
                return res.status(400).json({ error: 'Task text is required and cannot be empty' });
            }
            if (text.trim().length > 255) {
                return res.status(400).json({ error: 'Task text cannot exceed 255 characters' });
            }

            const newTask = await taskService.createTask(text.trim());
            res.status(201).json(newTask);
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ error: 'Internal server error while creating task' });
        }
    },

    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            if (!uuidRegex.test(id)) {
                return res.status(400).json({ error: 'Invalid task ID format' });
            }

            const { text, completed } = req.body;

            if (text !== undefined) {
                if (typeof text !== 'string' || text.trim() === '') {
                    return res.status(400).json({ error: 'Task text cannot be empty' });
                }
                if (text.trim().length > 255) {
                    return res.status(400).json({ error: 'Task text cannot exceed 255 characters' });
                }
            }
            if (completed !== undefined && typeof completed !== 'boolean') {
                return res.status(400).json({ error: 'Completed status must be a boolean' });
            }

            const updates = {};
            if (text !== undefined) updates.text = text.trim();
            if (completed !== undefined) updates.completed = completed;

            const updatedTask = await taskService.updateTask(id, updates);
            if (!updatedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }

            res.json(updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ error: 'Internal server error while updating task' });
        }
    },

    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;
            if (!uuidRegex.test(id)) {
                return res.status(400).json({ error: 'Invalid task ID format' });
            }

            const deleted = await taskService.deleteTask(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(204).send(); // No content for successful deletion
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: 'Internal server error while deleting task' });
        }
    }
};

module.exports = taskController;
