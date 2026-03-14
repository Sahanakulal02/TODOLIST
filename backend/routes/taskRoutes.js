const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  getReportTasks,
} = require('../controllers/taskController');

// Report route must be before :id to avoid "report" being parsed as id
router.get('/report', getReportTasks);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', completeTask);

module.exports = router;
