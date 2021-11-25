const express = require('express');
const router = express.Router();

const {createExtraClass,
       updateExtraClass, 
       deleteExtraClass,
       getExtraClassesListByBatch,
       getExtraClassesListByTeacherID} = require('../controllers/extraClass')

router.post('/create',createExtraClass);
router.post('/update',updateExtraClass);
router.post('/delete',deleteExtraClass);
router.get('/student/:batch/get',getExtraClassesListByBatch);
router.get('/teacher/:teacherID/get',getExtraClassesListByTeacherID);

module.exports = router
