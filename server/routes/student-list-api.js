const express = require('express');

const router = express.Router();

const studentListController = require('../controllers/student-list');

router.get('/getStudents', studentListController.readStudentList);

module.exports = router;
