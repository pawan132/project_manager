const express = require('express');
const router = express.Router();
const { projectAdd, getProject } = require('../controllers/projectController');
const verifyToken = require('../middlewares/auth');

// POST /api/projects
router.post('/', verifyToken, projectAdd);

router.get('/get-project',getProject);

module.exports = router;
