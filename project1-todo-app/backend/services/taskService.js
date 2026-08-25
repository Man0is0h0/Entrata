const db = require('../database');
const crypto = require('crypto');

const taskService = {
    getAllTasks: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM tasks ORDER BY createdAt DESC', (err, rows) => {
                if (err) return reject(err);
                // Convert boolean from SQLite (0/1) to JS boolean
                const tasks = rows.map(r => ({ ...r, completed: !!r.completed }));
                resolve(tasks);
            });
        });
    },

    getTaskById: (id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                if (row) row.completed = !!row.completed;
                resolve(row);
            });
        });
    },

    createTask: (text) => {
        return new Promise((resolve, reject) => {
            const id = crypto.randomUUID();
            db.run(
                'INSERT INTO tasks (id, text, completed) VALUES (?, ?, 0)',
                [id, text],
                function (err) {
                    if (err) return reject(err);
                    taskService.getTaskById(id).then(resolve).catch(reject);
                }
            );
        });
    },

    updateTask: (id, updates) => {
        return new Promise((resolve, reject) => {
            const fields = [];
            const values = [];

            if (updates.text !== undefined) {
                fields.push('text = ?');
                values.push(updates.text);
            }
            if (updates.completed !== undefined) {
                fields.push('completed = ?');
                values.push(updates.completed ? 1 : 0);
            }

            if (fields.length === 0) return resolve(null); // Nothing to update

            fields.push("updatedAt = CURRENT_TIMESTAMP");
            values.push(id);

            const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;

            db.run(sql, values, function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null); // Task not found
                taskService.getTaskById(id).then(resolve).catch(reject);
            });
        });
    },

    deleteTask: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0); // true if deleted, false if not found
            });
        });
    }
};

module.exports = taskService;
