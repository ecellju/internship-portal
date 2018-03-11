const express = require('express');

const router = express.Router();

const studentListController = require('../controllers/student-list');
const studentListValidator = require('../validators/student-list');

router.get('/getStudents', studentListValidator.getStudentListValidator, studentListController.getStudentList);
router.get('/getNumOfStudents', studentListController.getNumOfStudents);

module.exports = router;
