const express = require('express');
const router = express.Router();

const {createExtraClass,
       updateExtraClass, 
       deleteExtraClass,
       getExtraClassesListByBatch,
       getExtraClassesListByTeacherID,
       getStudentsExtraClassesListByDate,
       getTeachersExtraClassesListByDate,
       serveRequest,deleteRequest, slotCheck} = require('../controllers/extraClass')

router.post('/create',createExtraClass);
router.post('/update',updateExtraClass);
router.post('/delete',deleteExtraClass);
router.post('/serveRequest',serveRequest);
router.post('/deleteRequest',deleteRequest);
router.post('/slotCheck',slotCheck)
router.get('/student/:batch/get',getExtraClassesListByBatch);
router.get('/teacher/:teacherID/get',getExtraClassesListByTeacherID);
router.get('/todaysExtraLectures/:batch',getStudentsExtraClassesListByDate);
router.get('/todaysExtraLectures/teacher/:teacherID',getTeachersExtraClassesListByDate);

module.exports = router
