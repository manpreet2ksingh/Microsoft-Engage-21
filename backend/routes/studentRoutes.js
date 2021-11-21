const express = require('express');
const router = express.Router();

const { saveResponse, 
        getStudentByID,
        updateResponse,
        getStudentsByBatch,
        selectedStudentsForOfflineLecture,
        getLectureStatus} = require('../controllers/student')

router.get('/:batch',getStudentsByBatch);
router.post('/:studentID/response',saveResponse);
router.post('/:studentID/updateResponse',updateResponse);
router.post('/getSelectedStudents',selectedStudentsForOfflineLecture);
router.post('/getLectureStatus',getLectureStatus);

router.param("studentID",getStudentByID);

module.exports = router
